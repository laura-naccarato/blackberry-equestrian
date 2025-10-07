#!/bin/bash

echo "Starting Decap CMS Test Backend..."
echo "This will allow you to test the CMS locally without GitHub authentication."
echo ""

# Start the test backend
echo "Starting test backend server on port 8081..."
npx decap-server &
BACKEND_PID=$!

# Give the backend time to start
sleep 2

# Start the Vite dev server
echo "Starting Vite development server..."
npm run dev &
VITE_PID=$!

echo ""
echo "================================"
echo "CMS Test Environment Ready!"
echo "================================"
echo "1. Open http://localhost:5173/admin/ in your browser"
echo "2. You can log in without GitHub authentication"
echo "3. Any changes will be saved locally"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $VITE_PID; exit" INT
wait