from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import bcrypt

app = Flask(__name__)

# Secret key for session management
app.secret_key = 'your_secret_key'

# In-memory store for users (this should be replaced by a database in a production environment)
users_db = {}

@app.route('/')
def index():
    # Render the login page (index.html)
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    confirm_password = request.form['confirm_password']

    # Check if the passwords match
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match!"}), 400

    # Check if the username already exists
    if username in users_db:
        return jsonify({"error": "Username already taken!"}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Store the new user in the database (users_db)
    users_db[username] = hashed_password

    return jsonify({"message": "User signed up successfully!"}), 200

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Check if the username exists
    if username not in users_db:
        return jsonify({"error": "Invalid username or password!"}), 400

    # Check if the password is correct
    stored_password = users_db[username]
    if not bcrypt.checkpw(password.encode('utf-8'), stored_password):
        return jsonify({"error": "Invalid username or password!"}), 400

    # Set session variables
    session['authenticated'] = True
    session['username'] = username

    return jsonify({"message": "Login successful!"}), 200

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('authenticated', None)
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'authenticated' in session:
        return render_template('i4.html')  # Render the dashboard if the user is authenticated
    else:
        return redirect(url_for('index'))  # Redirect to login page if not authenticated

if __name__ == '__main__':
    app.run(debug=True)
