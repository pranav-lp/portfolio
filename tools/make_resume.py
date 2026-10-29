# Regenerates src/assets/Pranav_LP_Resume.pdf  (pip install reportlab; python tools/make_resume.py)
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle as P
from reportlab.lib.colors import HexColor as H
from reportlab.platypus import SimpleDocTemplate,Paragraph,HRFlowable
G=H('#9a7b1c');K=H('#111111');M=H('#555555')
n=P('n',fontName='Helvetica-Bold',fontSize=22,leading=26,textColor=K);c=P('c',fontName='Helvetica',fontSize=9,leading=12,textColor=M)
h=P('h',fontName='Helvetica-Bold',fontSize=10.5,leading=14,textColor=G,spaceBefore=9,spaceAfter=2);b=P('b',fontName='Helvetica',fontSize=9,leading=12.2,textColor=K)
li=P('l',parent=b,leftIndent=10,bulletIndent=0)
sec=lambda t:[Paragraph(t.upper(),h),HRFlowable(width='100%',thickness=.6,color=G,spaceAfter=3)]
it=lambda t:Paragraph(t,li,bulletText='•')
S=[Paragraph('Pranav L.P.',n),Paragraph('Bengaluru, India  |  pranavworks.lp@gmail.com  |  linkedin.com/in/pranavlp  |  github.com/pranav-lp',c)]
S+=sec('Summary')+[Paragraph('AI &amp; Data Science student building agentic AI, satellite-vision and physical-AI systems. 1st place at the BGSCET Ideathon 2026, 2nd place at the National Physical AI ROBOTHON and HACKBLAZE 2K25, First Runner-Up at Anvation 2026.',b)]
S+=sec('Education')+[Paragraph('<b>B.E. Artificial Intelligence &amp; Data Science</b>, BGS College of Engineering &amp; Technology (BGSCET), Bengaluru, 2024 – 2028',b)]
S+=sec('Projects')+[it('<b>Sathya Drishti</b> (SIH 2026, ISRO/SAC PS 26167): agentic vision-language assistant for satellite imagery, with GeoTIFF analysis (rasterio), change detection and optical + SAR fusion. FastAPI, Gemini API; LoRA fine-tune planned on BigEarthNet, VRSBench and CDVQA.'),
it("<b>Pehchaan</b> (Anvation 2026, First Runner-Up): learns a creator's voice and writes posts in English, Hindi and Kannada with scored variants, guardrails and an Evidence View. TypeScript, Vite, Express, MCP."),
it("<b>KAIROS</b> (Build-Ora 2026, Hack Malenadu'26): predictive maintenance using Isolation Forest, an LSTM autoencoder and CUSUM to estimate remaining useful life; on-device SLM narrates faults on a Three.js dashboard."),
it('<b>CareSync AI</b>: elderly care platform with voice biomarkers, Supabase, Claude API and n8n workflows, built in a 24-hour hackathon.'),
it("<b>DevMind AI</b> (HackToFuture 4.0), <b>FraudShield</b> (Xpecto'26, IIT Mandi, solo; RapidMiner and Mendix), <b>VitaAI</b> (HackMarch 2.0; React, Claude API), <b>Veritas</b> (influencer analytics, XGBoost, FastAPI), <b>SNUFF</b> (personal AI assistant with document RAG, solo).")]
S+=sec('Achievements')+[it('1st place, BGSCET Ideathon 2026, with Sathya Drishti (topped the internal selection round with 94 points).'),it('2nd place, National Level Physical AI ROBOTHON (IEEE RAS): ROS, MoveIt, MuJoCo, LeRobot SO-101 arm calibration.'),it('First Runner-Up, Anvation 2026 (KSSEM, 24-hour national hackathon), 8–9 Oct 2026.'),it('2nd place, HACKBLAZE 2K25 (TechVidya).'),it('Flipkart GRiD 8.0: reached Round 2.')]
S+=sec('Technical skills')+[Paragraph('<b>Languages:</b> Python, TypeScript, JavaScript, C, SQL<br/><b>Agents and LLMs:</b> Claude API, Gemini API, n8n, MCP, multi-agent RAG<br/><b>Machine learning:</b> Isolation Forest, LSTM autoencoders, XGBoost, CUSUM, LoRA fine-tuning<br/><b>Vision and geospatial:</b> vision-language models, rasterio, GeoTIFF, change detection<br/><b>Front end:</b> React, TypeScript, Vite, Tailwind CSS, Three.js, GSAP<br/><b>Back end:</b> FastAPI, Node.js, Express, Supabase, PostgreSQL, Firebase<br/><b>Robotics:</b> ROS, MoveIt, MuJoCo, LeRobot',b)]
S+=sec('Certifications')+[Paragraph('Infosys Springboard  |  Udemy  |  Fundamentals of Data Structures in C',b)]
SimpleDocTemplate('src/assets/Pranav_LP_Resume.pdf',pagesize=A4,leftMargin=42,rightMargin=42,topMargin=36,bottomMargin=30,title='Pranav L.P. - Resume',author='Pranav L.P.').build(S)
