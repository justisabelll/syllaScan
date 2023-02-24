import torch 
import pandas as pd
from sentence_transformers import SentenceTransformer, util

queries =[
    "agree","affectionate","child","cheer","collab","commit","communal",
    "compassion","connect","considerate","cooperat","co-operat",
    "depend","emotiona","empath","feel","flatterable","gentle",
    "honest","interpersonal","interdependen","interpersona","inter-personal",
    "inter-dependen","inter-persona","kind","kinship","loyal","modesty",
    "nag","nurtur","pleasant","polite","quiet","respon","sensitiv",
    "submissive","support","sympath","tender","together","trust","understand",
    "warm","whin","enthusias","inclusive","yield","share","sharin","active",
    "adventurous","aggress","ambitio","analy","assert","athlet","autonom",
    "battle","boast","challeng", "champion","compet","confident","courag",
    "decid","decision","decisive","defend","determin","domina","dominant",
    "driven","fearless","fight","force","greedy","head-strong","headstrong",
    "hierarch","hostil","impulsive","independen","individual","intellect",
    "lead","logic", "objective","opinion","outspoken","persist","principle",
    "reckless","self-confiden","self-relian","self-sufficien","selfconfiden",
    "selfrelian","selfsufficien","stubborn","superior","unreasonab", 
    "co-operat","inter-personal","inter-dependen","inter-persona",
    "self-confiden","self-relian","self-sufficien"
]

class result:
    def __init__(self, corpus):
        self.corpus = corpus
        self.findings = []
        self.docScore = 0.0
        
    def calculateDocScore(self):
        docScore = 0.0
        for i in range(len(self.findings)):
            docScore += self.findings[i]['score']
            docScore = docScore/len(self.corpus.split(' '))
        return docScore
    
    def toObject(self):
        return {
        'corpus':self.corpus,
        'findings':self.findings,
        'docScore':self.docScore
        }
        

        
        
    

def semanticSearch(syllabus):
    embedder = SentenceTransformer('all-MiniLM-L6-v2')
    corpus = syllabus.split(' ')
    corpus_embeddings = embedder.encode(corpus, convert_to_tensor=True)
    results = result(syllabus)
    top_k = min(5, len(corpus))
    for query in queries:
        query_embedding = embedder.encode(query, convert_to_tensor=True)
        cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
        top_results = torch.topk(cos_scores, k=top_k)
        if top_results[0][0] > 0.5:
            
            idx = top_results[1][0].item()
            score = top_results[0][0].item()
            word = corpus[idx]
            

            results.findings.append({'query':query,'word':word,'idx':idx,'score':score})
    results.docScore = results.calculateDocScore()
    return results