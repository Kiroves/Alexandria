import time
import subprocess
from pinecone import Pinecone, ServerlessSpec

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Pinecone as PC

from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

from langchain.text_splitter import RecursiveCharacterTextSplitter

from dotenv import load_dotenv
import os

load_dotenv()

PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API')

pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "alexandria-test-2"

def init_log():
    command = f'echo "" > ./main.log'
    subprocess.run(command, shell=True)

def log(content):
    command = f'echo "\n-------------------------------------------\n{content}" >> ./main.log'
    subprocess.run(command, shell=True)

def create_index(pc, index_name):
    spec = ServerlessSpec(
        cloud="aws",
        region="us-west-2"
    )

    if index_name in pc.list_indexes().names():
        pc.delete_index(index_name)

    pc.create_index(
        index_name,
        dimension=1536,  # dimensionality of text-embedding-ada-002
        metric='cosine',
        spec=spec
    )

    while not pc.describe_index(index_name).status['ready']:
        print("waiting for index to be ready")
        time.sleep(1)

# def create_embeddings(vectorstore, pdf_path):
PDF_FILE_PATH = "./data/companion.pdf"

def split_text(pc, index_name, pdf_start, pdf_end):
    loader = PyPDFLoader(PDF_FILE_PATH)
    pages = loader.load_and_split()[pdf_start:pdf_end]

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=80)
    texts = text_splitter.split_documents(pages)
    log(texts)

    return texts

def upsert(texts, index):
    docs = []
    embed = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    vectorstore = PC(index, embed, "text")

    # for i, text in enumerate(texts):
    #     embedding = embed.embed_query(text.page_content)
    #     metadata = {
    #         "text": text.page_content,
    #     }
    #     docs.append((str(i), embedding, metadata))
    
    index.upsert(docs, batch_size=32)

    return vectorstore
    

def query(llm, vectorstore, prompt):
    # llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)

    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever()
    )

    # response = qa.invoke(query)
    
def main():
    init_log()
    llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)
    index = pc.Index(index_name)

    texts = split_text(pc, index, 3, 10)
    vstore = upsert(texts, index)
    query(llm, vstore, "what is a combinatorial circuit")

main()

    
    
    
# # create_index(pc, index_name)
# index = pc.Index(index_name)
# # print(index)
# # create_embeddings(vectorstore, "./data/companion.pdf")
# loader = PyPDFLoader("./data/companion.pdf")
# pages = loader.load_and_split()
# page_contents = [page.page_content for page in pages]
# # vectorstore.add_texts([page.page_content for page in pages])
# docs = []
# pages = pages[3:10]
# # combine all pages into one list  of strings
# # page_content = " ".join([page.page_content for page in pages])
# # print(page_content)
# text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=80)
# texts = text_splitter.split_documents(pages)


# print(texts)




# # print(page00)

# embed = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
# vectorstore = PC(
#     index, embed, "text"
# )

# for i, text in enumerate(texts):
#     embedding = embed.embed_query(text.page_content)
#     metadata = {
#         "text": text.page_content,
#     }
#     docs.append((str(i), embedding, metadata))

# # docs.append(("0", embed.embed_query(page_content), {"text": page_content}))


# index.upsert(docs, batch_size=32)





# # index.upsert(page_contents)

# # for batch in page_contents.iter_documents(batch_size=100):


# query = "what is a combination circuit?"

# llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)


# qa = RetrievalQA.from_chain_type(
#     llm=llm,
#     chain_type="stuff",
#     retriever=vectorstore.as_retriever()
# )

# print(qa.invoke(query))
