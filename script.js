// AI Career Advisor JavaScript
class CareerAdvisor {
    constructor() {
        this.resumeData = null;
        this.jobDatabase = this.initializeJobDatabase();
        this.skillsDatabase = this.initializeSkillsDatabase();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const resumeFile = document.getElementById('resumeFile');
        const resumeText = document.getElementById('resumeText');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const newAnalysisBtn = document.getElementById('newAnalysisBtn');

        resumeFile.addEventListener('change', this.handleFileUpload.bind(this));
        resumeText.addEventListener('input', this.handleTextInput.bind(this));
        analyzeBtn.addEventListener('click', this.analyzeResume.bind(this));
        newAnalysisBtn.addEventListener('click', this.resetAnalysis.bind(this));
    }

    initializeJobDatabase() {
        return [
            {
                title: "Frontend Developer",
                icon: "fas fa-code",
                skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "TypeScript", "SASS", "Bootstrap"],
                description: "Build user interfaces and web applications",
                experience: ["UI/UX", "Web Development", "Frontend", "JavaScript"],
                education: ["Computer Science", "Web Development", "Software Engineering"]
            },
            {
                title: "Backend Developer",
                icon: "fas fa-server",
                skills: ["Python", "Java", "Node.js", "SQL", "MongoDB", "REST API", "Express.js", "Django", "Spring"],
                description: "Develop server-side logic and databases",
                experience: ["Backend", "API Development", "Database", "Server"],
                education: ["Computer Science", "Software Engineering", "Information Technology"]
            },
            {
                title: "Full Stack Developer",
                icon: "fas fa-layer-group",
                skills: ["JavaScript", "Python", "React", "Node.js", "SQL", "MongoDB", "HTML", "CSS", "REST API"],
                description: "Work on both frontend and backend development",
                experience: ["Full Stack", "Web Development", "Frontend", "Backend"],
                education: ["Computer Science", "Software Engineering", "Web Development"]
            },
            {
                title: "Data Scientist",
                icon: "fas fa-chart-bar",
                skills: ["Python", "R", "SQL", "Machine Learning", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Statistics"],
                description: "Analyze data and build predictive models",
                experience: ["Data Analysis", "Machine Learning", "Statistics", "Research"],
                education: ["Data Science", "Statistics", "Mathematics", "Computer Science"]
            },
            {
                title: "DevOps Engineer",
                icon: "fas fa-cogs",
                skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Git", "Linux", "Python", "Bash", "Terraform"],
                description: "Manage deployment and infrastructure",
                experience: ["DevOps", "Cloud", "Infrastructure", "Automation"],
                education: ["Computer Science", "Information Technology", "Software Engineering"]
            },
            {
                title: "Mobile App Developer",
                icon: "fas fa-mobile-alt",
                skills: ["React Native", "Flutter", "Swift", "Kotlin", "Java", "JavaScript", "iOS", "Android"],
                description: "Develop mobile applications for iOS and Android",
                experience: ["Mobile Development", "App Development", "iOS", "Android"],
                education: ["Computer Science", "Software Engineering", "Mobile Development"]
            },
            {
                title: "UI/UX Designer",
                icon: "fas fa-paint-brush",
                skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "User Research", "Prototyping", "Wireframing"],
                description: "Design user interfaces and user experiences",
                experience: ["UI Design", "UX Design", "Graphic Design", "User Research"],
                education: ["Design", "Human-Computer Interaction", "Graphic Design", "Art"]
            },
            {
                title: "Cybersecurity Analyst",
                icon: "fas fa-shield-alt",
                skills: ["Network Security", "Penetration Testing", "CISSP", "Firewall", "Incident Response", "Risk Assessment"],
                description: "Protect systems and networks from security threats",
                experience: ["Security", "Network Administration", "Risk Management"],
                education: ["Cybersecurity", "Information Security", "Computer Science"]
            },
            {
                title: "Product Manager",
                icon: "fas fa-clipboard-list",
                skills: ["Product Strategy", "Agile", "Scrum", "Market Research", "Analytics", "Roadmapping", "Stakeholder Management"],
                description: "Guide product development and strategy",
                experience: ["Product Management", "Project Management", "Strategy", "Business Analysis"],
                education: ["Business", "MBA", "Engineering", "Computer Science"]
            },
            {
                title: "Cloud Architect",
                icon: "fas fa-cloud",
                skills: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Microservices", "Serverless", "Infrastructure as Code"],
                description: "Design and implement cloud infrastructure solutions",
                experience: ["Cloud Computing", "Architecture", "Infrastructure", "DevOps"],
                education: ["Computer Science", "Information Technology", "Cloud Computing"]
            }
        ];
    }

    initializeSkillsDatabase() {
        return {
            technical: [
                // Programming Languages
                "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Rust", "Swift", "Kotlin",
                "TypeScript", "R", "MATLAB", "Scala", "Perl", "Objective-C",
                
                // Web Technologies
                "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask",
                "Spring", "Laravel", "Ruby on Rails", "ASP.NET", "Bootstrap", "SASS", "LESS",
                
                // Databases
                "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", "SQLite", "Cassandra",
                "DynamoDB", "Firebase",
                
                // Cloud & DevOps
                "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "Git", "Linux",
                "Terraform", "Ansible", "Chef", "Puppet", "CI/CD", "Microservices",
                
                // Data Science & AI
                "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas",
                "NumPy", "Matplotlib", "Tableau", "Power BI", "Apache Spark", "Hadoop",
                
                // Mobile Development
                "React Native", "Flutter", "iOS", "Android", "Xamarin", "Ionic",
                
                // Design & Tools
                "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InVision", "Zeplin"
            ],
            soft: [
                "Leadership", "Communication", "Teamwork", "Problem Solving", "Critical Thinking",
                "Project Management", "Time Management", "Adaptability", "Creativity", "Analytical Skills",
                "Attention to Detail", "Customer Service", "Negotiation", "Presentation Skills",
                "Strategic Thinking", "Decision Making", "Conflict Resolution", "Mentoring"
            ]
        };
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            document.getElementById('fileName').textContent = file.name;
            this.readFile(file);
        }
    }

    readFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            document.getElementById('resumeText').value = text;
            this.enableAnalyzeButton();
        };
        reader.readAsText(file);
    }

    handleTextInput(event) {
        const text = event.target.value.trim();
        if (text.length > 50) {
            this.enableAnalyzeButton();
        } else {
            this.disableAnalyzeButton();
        }
    }

    enableAnalyzeButton() {
        const btn = document.getElementById('analyzeBtn');
        btn.disabled = false;
    }

    disableAnalyzeButton() {
        const btn = document.getElementById('analyzeBtn');
        btn.disabled = true;
    }

    async analyzeResume() {
        const resumeText = document.getElementById('resumeText').value.trim();
        if (!resumeText) {
            alert('Please provide resume text to analyze.');
            return;
        }

        this.showLoading();
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.resumeData = this.extractResumeData(resumeText);
        this.displayResults();
    }

    extractResumeData(text) {
        const lowerText = text.toLowerCase();
        
        // Extract skills
        const technicalSkills = this.skillsDatabase.technical.filter(skill => 
            lowerText.includes(skill.toLowerCase())
        );
        
        const softSkills = this.skillsDatabase.soft.filter(skill => 
            lowerText.includes(skill.toLowerCase())
        );

        // Extract education
        const educationKeywords = [
            "bachelor", "master", "phd", "degree", "university", "college", "certification",
            "computer science", "engineering", "business", "mba", "data science", "information technology"
        ];
        
        const education = educationKeywords.filter(keyword => 
            lowerText.includes(keyword)
        );

        // Extract experience level
        const experienceMatch = text.match(/(\d+)\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/i);
        const experienceYears = experienceMatch ? parseInt(experienceMatch[1]) : 0;

        // Extract job titles and roles
        const jobTitles = [
            "developer", "engineer", "analyst", "manager", "designer", "architect", "consultant",
            "specialist", "coordinator", "administrator", "technician", "programmer", "scientist"
        ];
        
        const roles = jobTitles.filter(title => lowerText.includes(title));

        return {
            skills: {
                technical: technicalSkills,
                soft: softSkills
            },
            education: education,
            experience: {
                years: experienceYears,
                roles: roles
            },
            rawText: text
        };
    }

    calculateJobMatch(job) {
        let score = 0;
        let reasons = [];

        // Check technical skills match
        const matchingSkills = job.skills.filter(skill => 
            this.resumeData.skills.technical.some(userSkill => 
                userSkill.toLowerCase() === skill.toLowerCase()
            )
        );

        if (matchingSkills.length > 0) {
            score += (matchingSkills.length / job.skills.length) * 60;
            reasons.push(`Matches ${matchingSkills.length} required skills: ${matchingSkills.slice(0, 3).join(', ')}`);
        }

        // Check experience relevance
        const relevantExperience = job.experience.some(exp => 
            this.resumeData.experience.roles.some(role => 
                role.toLowerCase().includes(exp.toLowerCase()) || 
                exp.toLowerCase().includes(role.toLowerCase())
            )
        );

        if (relevantExperience) {
            score += 25;
            reasons.push("Has relevant work experience");
        }

        // Check education relevance
        const relevantEducation = job.education.some(edu => 
            this.resumeData.education.some(userEdu => 
                userEdu.toLowerCase().includes(edu.toLowerCase()) || 
                edu.toLowerCase().includes(userEdu.toLowerCase())
            )
        );

        if (relevantEducation) {
            score += 15;
            reasons.push("Educational background aligns");
        }

        return {
            score: Math.min(Math.round(score), 100),
            reasons: reasons,
            matchingSkills: matchingSkills
        };
    }

    generateJobRecommendations() {
        const recommendations = this.jobDatabase.map(job => {
            const match = this.calculateJobMatch(job);
            return {
                ...job,
                matchScore: match.score,
                reasons: match.reasons,
                matchingSkills: match.matchingSkills
            };
        });

        // Sort by match score and return top matches
        return recommendations
            .filter(job => job.matchScore > 20)
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 8);
    }

    generateImprovementSuggestions() {
        const suggestions = [];
        
        // Skill gap analysis
        const topJobs = this.generateJobRecommendations().slice(0, 3);
        const missingSkills = new Set();
        
        topJobs.forEach(job => {
            job.skills.forEach(skill => {
                if (!this.resumeData.skills.technical.some(userSkill => 
                    userSkill.toLowerCase() === skill.toLowerCase())) {
                    missingSkills.add(skill);
                }
            });
        });

        if (missingSkills.size > 0) {
            const skillsList = Array.from(missingSkills).slice(0, 5).join(', ');
            suggestions.push(`Consider learning these in-demand skills: ${skillsList}`);
        }

        // Certification suggestions
        if (this.resumeData.skills.technical.includes('AWS') || 
            this.resumeData.skills.technical.includes('Cloud')) {
            suggestions.push("Consider getting AWS or Azure cloud certifications to boost your profile");
        }

        if (this.resumeData.skills.technical.some(skill => 
            ['Python', 'Machine Learning', 'Data Science'].includes(skill))) {
            suggestions.push("Consider pursuing data science certifications or advanced analytics courses");
        }

        // Experience suggestions
        if (this.resumeData.experience.years < 2) {
            suggestions.push("Consider contributing to open-source projects to demonstrate your skills");
            suggestions.push("Build a portfolio of personal projects to showcase your abilities");
        }

        // General suggestions
        suggestions.push("Tailor your resume keywords to match job descriptions you're interested in");
        suggestions.push("Consider adding quantifiable achievements and metrics to your experience");

        return suggestions;
    }

    showLoading() {
        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('loadingSection').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
    }

    displayResults() {
        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('loadingSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';

        this.displayAnalysisSummary();
        this.displayJobRecommendations();
        this.displayImprovementSuggestions();
    }

    displayAnalysisSummary() {
        const summaryContainer = document.getElementById('analysisSummary');
        
        const summaryHTML = `
            <h3><i class="fas fa-user-circle"></i> Resume Analysis Summary</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <h4><i class="fas fa-tools"></i> Technical Skills</h4>
                    <ul>
                        ${this.resumeData.skills.technical.slice(0, 8).map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
                <div class="summary-item">
                    <h4><i class="fas fa-heart"></i> Soft Skills</h4>
                    <ul>
                        ${this.resumeData.skills.soft.slice(0, 6).map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
                <div class="summary-item">
                    <h4><i class="fas fa-graduation-cap"></i> Education & Background</h4>
                    <ul>
                        ${this.resumeData.education.slice(0, 5).map(edu => `<li>${edu}</li>`).join('')}
                    </ul>
                </div>
                <div class="summary-item">
                    <h4><i class="fas fa-briefcase"></i> Experience</h4>
                    <p>${this.resumeData.experience.years > 0 ? `${this.resumeData.experience.years} years` : 'Entry level'}</p>
                    <ul>
                        ${this.resumeData.experience.roles.slice(0, 4).map(role => `<li>${role}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        summaryContainer.innerHTML = summaryHTML;
    }

    displayJobRecommendations() {
        const recommendationsContainer = document.getElementById('jobRecommendations');
        const recommendations = this.generateJobRecommendations();
        
        const recommendationsHTML = `
            <h3><i class="fas fa-star"></i> Recommended Job Roles</h3>
            <div class="job-grid">
                ${recommendations.map(job => `
                    <div class="job-card">
                        <div class="job-header">
                            <div class="job-icon">
                                <i class="${job.icon}"></i>
                            </div>
                            <div>
                                <h4 class="job-title">${job.title}</h4>
                            </div>
                            <div class="match-score">${job.matchScore}% Match</div>
                        </div>
                        <div class="job-reason">
                            <strong>Why this role suits you:</strong><br>
                            ${job.reasons.join('. ')}
                        </div>
                        <div class="job-skills">
                            <h5>Key Skills Required:</h5>
                            ${job.skills.slice(0, 6).map(skill => 
                                `<span class="skill-tag ${job.matchingSkills.includes(skill) ? 'matched' : ''}">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        recommendationsContainer.innerHTML = recommendationsHTML;
    }

    displayImprovementSuggestions() {
        const suggestionsContainer = document.getElementById('improvementSuggestions');
        const suggestions = this.generateImprovementSuggestions();
        
        const suggestionsHTML = `
            <h3><i class="fas fa-lightbulb"></i> Improvement Suggestions</h3>
            <ul class="suggestion-list">
                ${suggestions.map(suggestion => `
                    <li>
                        <i class="fas fa-arrow-right"></i>
                        <span>${suggestion}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        suggestionsContainer.innerHTML = suggestionsHTML;
    }

    resetAnalysis() {
        document.getElementById('uploadSection').style.display = 'block';
        document.getElementById('loadingSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
        
        document.getElementById('resumeText').value = '';
        document.getElementById('resumeFile').value = '';
        document.getElementById('fileName').textContent = '';
        this.disableAnalyzeButton();
        
        this.resumeData = null;
    }
}

// Initialize the Career Advisor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CareerAdvisor();
});

// Add some additional CSS for matched skills
const additionalCSS = `
    .skill-tag.matched {
        background: #28a745 !important;
        color: white !important;
        font-weight: 500;
    }
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
