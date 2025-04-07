from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL Connection Setup
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Saniyas@2006",
        database="online_orders"
    )

# Home route to check if the server is running
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Online Orders API"}), 200

# Route to place an order
@app.route('/add_order', methods=['POST'])
def add_order():
    try:
        data = request.json
        product_name = data.get('product_name')
        quantity = data.get('quantity')
        price = data.get('price')

        if not all([product_name, quantity, price]):
            return jsonify({"error": "Missing required fields"}), 400

        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO new_orders (product_name, quantity, price) VALUES (%s, %s, %s)", 
            (product_name, quantity, price)
        )
        db.commit()
        cursor.close()
        db.close()

        return jsonify({"message": "Order placed successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to fetch all orders
@app.route('/get_orders', methods=['GET'])
def get_orders():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM new_orders")
        orders = cursor.fetchall()
        cursor.close()
        db.close()

        return jsonify({"orders": orders}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to delete an order by ID
@app.route('/delete_order/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM new_orders WHERE id = %s", (order_id,))
        db.commit()
        cursor.close()
        db.close()

        return jsonify({"message": "Order deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
