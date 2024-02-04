from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
import os

from langchain_community.vectorstores import Pinecone as PC
from langchain.embeddings.openai import OpenAIEmbeddings
from pinecone import Pinecone

from langchain_openai import ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.chains import RetrievalQA

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_API_ENV = os.getenv('PINECONE_API_ENV') 

loader = PyPDFLoader("./data/companion.pdf")


pages = loader.load_and_split()

print(pages[6].page_content)

# text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=80)
# texts = text_splitter.split_documents(pages)

# print(texts[6])

# pc = Pinecone(
#     api_key=PINECONE_API_KEY,  # find at app.pinecone.io
# )
# index_name = "alexandria"

# index = pc.Index(index_name)


# embed = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

# text_field = "text"

# # switch back to normal index for langchain
# vectorstore = PC(
#     index, embed.embed_query, text_field
# )

# query = "This course is divided into how many sections?"

# llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)


# qa = RetrievalQA.from_chain_type(
#     llm=llm,
#     chain_type="stuff",
#     retriever=vectorstore.as_retriever()
# )

# print(qa.invoke(query))
