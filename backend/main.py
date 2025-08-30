from fastapi import FastAPI

# Create the FastAPI app
app = FastAPI()

# Root route (just to test)
@app.get("/")
def read_root():
    return {"message": "🚀 Placement Tracker Backend is running!"}

# Example test route
@app.get("/students")
def get_students():
    return {"students": ["Manmeet", "Test User"]}
 