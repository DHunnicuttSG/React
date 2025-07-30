# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, allowing your frontend to access this API

# --- Database Configuration ---
DB_CONFIG = {
    'host': 'localhost',
    'database': 'tododb',
    'user': 'root', # Your MySQL username
    'password': 'RootRoot'  # Your MySQL password
}

def get_db_connection():
    """Establishes and returns a new database connection."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# --- Helper Function to fetch todo data into dictionary ---
def row_to_dict(cursor, row):
    """Converts a database row to a dictionary using cursor description."""
    if row is None:
        return None
    
    # Get column names from cursor description
    columns = [desc[0] for desc in cursor.description]
    
    # Create a dictionary from column names and row values
    data = dict(zip(columns, row))
    
    # Convert 'finished' (TINYINT(1)) to boolean
    if 'finished' in data:
        data['finished'] = bool(data['finished']) # Convert 0/1 to False/True
    
    return data

# --- API Endpoints ---

@app.route('/')
def home():
    """Basic home route to confirm API is running."""
    return jsonify({"message": "Welcome to the To-Do API! Use /todos for tasks."})

# GET all todos
@app.route('/todos', methods=['GET'])
def get_todos():
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor(dictionary=False) # Use dictionary=False to get tuples, then convert with helper
        cursor.execute("SELECT id, todo, note, finished FROM todo")
        todos = [row_to_dict(cursor, row) for row in cursor.fetchall()]
        cursor.close()
        return jsonify(todos), 200
    except Error as e:
        print(f"Error fetching todos: {e}")
        return jsonify({"error": f"Failed to retrieve todos: {e}"}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

# GET a single todo by ID
@app.route('/todos/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor(dictionary=False)
        cursor.execute("SELECT id, todo, note, finished FROM todo WHERE id = %s", (todo_id,))
        todo = row_to_dict(cursor, cursor.fetchone())
        cursor.close()

        if todo:
            return jsonify(todo), 200
        else:
            return jsonify({"message": "Todo not found"}), 404
    except Error as e:
        print(f"Error fetching todo: {e}")
        return jsonify({"error": f"Failed to retrieve todo: {e}"}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

# ADD a new todo
@app.route('/todos', methods=['POST'])
def add_todo():
    new_todo_data = request.get_json()
    if not new_todo_data or 'todo' not in new_todo_data:
        return jsonify({"error": "Missing 'todo' field in request data"}), 400

    todo_text = new_todo_data['todo']
    note_text = new_todo_data.get('note', None) # Note is optional
    finished_status = new_todo_data.get('finished', False) # Default to False if not provided

    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor()
        query = "INSERT INTO todo (todo, note, finished) VALUES (%s, %s, %s)"
        cursor.execute(query, (todo_text, note_text, finished_status))
        conn.commit()
        
        # Get the ID of the newly inserted todo
        new_todo_id = cursor.lastrowid
        cursor.close()

        # Fetch the newly created todo to return it
        return get_todo(new_todo_id)[0], 201 # Call get_todo and return its jsonify response and status
    except Error as e:
        print(f"Error adding todo: {e}")
        return jsonify({"error": f"Failed to add todo: {e}"}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

# UPDATE an existing todo
@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    update_data = request.get_json()
    if not update_data:
        return jsonify({"error": "No data provided for update"}), 400

    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor()
        
        # Build the update query dynamically based on provided fields
        set_clauses = []
        values = []

        if 'todo' in update_data:
            set_clauses.append("todo = %s")
            values.append(update_data['todo'])
        if 'note' in update_data:
            set_clauses.append("note = %s")
            values.append(update_data['note'])
        if 'finished' in update_data:
            set_clauses.append("finished = %s")
            values.append(update_data['finished'])
        
        if not set_clauses:
            return jsonify({"error": "No valid fields provided for update (expected 'todo', 'note', or 'finished')"}), 400

        query = f"UPDATE todo SET {', '.join(set_clauses)} WHERE id = %s"
        values.append(todo_id) # Add the ID to the end of values for the WHERE clause

        cursor.execute(query, tuple(values))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"message": "Todo not found or no changes made"}), 404
        
        cursor.close()
        
        # Fetch the updated todo to return it
        return get_todo(todo_id)[0], 200 # Call get_todo and return its jsonify response and status
    except Error as e:
        print(f"Error updating todo: {e}")
        return jsonify({"error": f"Failed to update todo: {e}"}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

# DELETE a todo
@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor()
        cursor.execute("DELETE FROM todo WHERE id = %s", (todo_id,))
        conn.commit()

        if cursor.rowcount > 0:
            return jsonify({"message": f"Todo with ID {todo_id} deleted successfully"}), 200
        else:
            return jsonify({"message": "Todo not found"}), 404
    except Error as e:
        print(f"Error deleting todo: {e}")
        return jsonify({"error": f"Failed to delete todo: {e}"}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

# --- Run the Flask App ---
if __name__ == '__main__':
    # You can change the port if 5000 is in use
    app.run(debug=True, port=5000)