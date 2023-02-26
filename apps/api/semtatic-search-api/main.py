from semanticSearch import semanticSearch as Search 
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

def prints(text):
    print(type(text))
    
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3000/Upload",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
   return {"Working": "True"}


@app.post("/upload")
async def root(file: UploadFile = File(...)):
    syllabus = await file.read() 
        
    return {'results':(Search(syllabus.decode('utf-8')))}
