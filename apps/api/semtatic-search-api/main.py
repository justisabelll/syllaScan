from semanticSearch import semanticSearch as Search 
from fastapi import FastAPI, File, UploadFile


app = FastAPI()

def prints(text):
    print(type(text))

#@semanticSearchAPI.get("/")
#def read_root():
#    return {"Hello": "World"}


@app.post("/")
async def root(file: UploadFile = File(...)):
    syllabus = await file.read() 
        
    return {'results':(Search(syllabus.decode('utf-8')))}
