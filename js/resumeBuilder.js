// A bio-object to store some personal biographical info
var bio = {
    "name": "Sil Westerveld",
    "role": "Udacity Student",
    "contacts": {
        "mobile": "+31(0)6 24 25 xx xx",
        "email": "nd001p2@silwesterveld.com",
        "github": "swesterveld",
        "twitter": "@swesterveld",
        "location": "Amsterdam, NL"
    },
    "welcomeMessage" : "Hello world! This is the resume I've built while following a JavaScript Basics course at Udacity.com. This course is part of the curriculum for the Nanodegree Front-End Web Developer, which I'm enrolled in. The tag-cloud you see here is showing some of my skills. It's dynamicaly generated, so if you refresh the page it will be different. This has been accomplished by implementing D3.js.",
    "skills": [
        "Awesomeness", "Unpretentiousness", "Linux", "GNU tools", "JavaScript",
        "jQuery", "Apache", "Distributed Systems", "Bash", "PostgreSQL", "C++",
        "High Performance Computing", "Unix", "Git", "MySQL", "Python", "Trac",
        "Programming", "Kanban", "CFEngine", "System Administration", "Ubuntu",
        "Configuration Management", "HTML", "CSS", "Debian", "LaTeX", "CentOS",
        "Django", "Ruby", "Shell Scripting", "Algorithms", "Code Optimization",
        "GitHub", "C", "Java", "Ruby on Rails", "Cluster Computing", "Redmine",
        "Nginx", "Amazon Web Services", "Japanese Language", "Vim", "Phonegap",
        "Autodidacticism", "D3.js"
    ],
    "biopic": "images/me.jpg"
};

// Add a function to make a word-cloud of the skills defined in the
// bio-object
bio.show_skills = function() {
    var colors = d3.scale.category20();
    // make the word-cloud fit on the first screen
    var width = document.getElementById("header").offsetWidth-96;
    var height =
        window.innerHeight - document.getElementById("header").offsetHeight;

    // initialize (calculate) the cloud and draw it
    function calculateCloud(words) {
        d3.layout.cloud()
            .size([width, height])
            .words(words.map(function(d) {
                return {text: d, size: 10 + Math.random() * 90};
            }))
            .padding(1)
            // ~~ is a bitwise Math.floor for values > 0, but quicker.
            // rotate either 0 or 90 degrees
            .rotate(function() { return ~~(Math.random() * 2) * 90 - 10; })
            .font("Gorditas")
            .fontSize(function(d) { return d.size; })
            .on("end", drawCloud)
            .start();
    }

    function drawCloud(words) {
        d3.select("#cloud").append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            // translate half the width and height
            .attr("transform", "translate("+width/2+", "+height/2+")")
        .selectAll("text")
            .data(words)
        .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Gorditas")
            .style("fill", function(d, i) { return colors(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }

    calculateCloud(this.skills);
};

// Add a function to the bio-object to display its contents
bio.display = function() {
    // Format the personal biographical info
    var formattedName = HTMLheaderName.replace("%data%", this.name);
    var formattedRole = HTMLheaderRole.replace("%data%", this.role);

    var formattedMobile = HTMLmobile.replace("%data%", this.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", this.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", this.contacts.github);
    var formattedTwitter = HTMLtwitter.replace("%data%", this.contacts.twitter);
    var formattedLocation = HTMLlocation.replace("%data%",
            this.contacts.location);
    var formattedPicture = HTMLbioPic.replace("%data%", this.biopic);
    var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%",
            this.welcomeMessage);

    // Add all previous info to the page
    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);

    $("#topContacts").append(formattedMobile);
    $("#topContacts").append(formattedEmail);
    $("#topContacts").append(formattedGithub);
    $("#topContacts").append(formattedTwitter);
    $("#topContacts").append(formattedLocation);

    $("#header").append(formattedPicture);
    $("#header").append(formattedWelcomeMsg);

    $("#footerContacts").prepend(formattedMobile);
    $("#footerContacts").prepend(formattedEmail);
    $("#footerContacts").prepend(formattedTwitter);
    $("#footerContacts").prepend(formattedGithub);
    $("#footerContacts").prepend(formattedLocation);

    if (this.skills) {
        /* this has been replaced by a skills-cloud in HTMLskillsCloud. **
        $("#header").append(HTMLskillsStart);

        for (i=0; i<this.skills.length; i++) {
            var formattedSkill = HTMLskills.replace("%data%", this.skills[i]);
            $("#skills").append(formattedSkill);
        }
        */
        $("#header").append(HTMLskillsCloud);
        this.show_skills();
    }
};


// A work-object to store some work-related info, like jobs and
// internships
var work = {
    "jobs": [
        {
            "employer": "Nishino",
            "title": "Owner",
            "location": "Amsterdam, NL",
            "dates": "2014 - present",
            "description": "Freelance consultant and engineer. I'm available for interesting projects. Please give me a shout if you need someone to help you out with your DevOps, for example."
        },
        {
            "employer": "Qardio, Inc.",
            "title": "Head of Security and System Infrastructure",
            "location": "San Francisco, USA",
            "dates": "2014 - 2015",
            "description": "DevOps and compliancy kinda magic for a startup in health. Worked in an international team, together with people from Italy, United Kingdom, Ukrain, Holland, Spain and Sweden."
        },
        {
            "employer": "Gengo",
            "title": "Translator",
            "location": "Tokyo, JP",
            "dates": "2011 - present",
            "description": "Translations from English/German to Dutch. Proofreading translations (from English to Dutch) conducted by other Gengo-translators. Worked on big projects for several well known S&P 500 and Fortune 500 listed companies, and have been selected as a preferred translator for some of those projects.",
        },
        {
            "employer": "SURFsara",
            "title": "System Programmer",
            "location": "Amsterdam, NL",
            "dates": "2008 - 2014",
            "description": "System administration for several High Performance Computing clusters at the national HPC and e-Science support center of Holland. Have been working on the national compute cluster (6500+ cores), a GPU-cluster (based on NVIDIA Tesla M1060), a prototype cluster (equiped with ClearSpeed acceleration cards), and some Hadoop clusters. Worked with operating systems like Debian, CentOS, Solaris, and developed scripts and tools (some of which are open source) in Bash, Python and Django as well."
        }
    ],
    "internships": [
        {
            "employer": "RIKEN Brain Science Institute",
            "title": "Software Analyst",
            "location": "Tokyo, JP",
            "dates": "2007 - 2008",
            "description": "Analyzed the computational complexity of an existing algorithm which calculates the mean geodesic in a network, and built networks of several standardized sets of kanji-characters to prove the findings. While analyzing the structure of those kanji-networks remarkable discoveries have been made in the field of Japanese language. The results have led to a cooperative effort in writing a scientific paper.",
        },
        {
            "employer": "Academic Medical Center Amsterdam",
            "title": "C++ Developer",
            "location": "Amsterdam, NL",
            "dates": "2005 - 2006",
            "description": "Developed a part of a distributed version of FAIPR (Framework for Automated Image Processing and Routing) at the Department of Medical Physics, to replace a (limited) stand-alone version that was in use at that moment. Due to the modular way it has been redeveloped, it is able to have more resources and be more dynamic, which makes it easy to extend. The FAIPR system is being used for automatic processing of medical images which are acquired by CT and MRI scanners in the clinic.",
        }
    ]
};

// Add a function to the work-object to display its contents
work.display = function() {
    if (work.jobs || work.internships) {
        $("#workExperience").append(HTMLworkStart);

        // Iterate over all jobs and internships
        var worktype = ["jobs", "internships"];
        for (i in worktype) {
            for (j in this[worktype[i]]) {
                var job = this[worktype[i]][j];

                // Format the work-related info
                var formattedEmployer = HTMLworkEmployer.replace("%data%",
                        job.employer);
                // Modify titles of internships, to mark them as such
                if (worktype[i] === "internships") {
                    var formattedTitle = HTMLworkTitle.replace( "%data%",
                            job.title+" (internship)");
                } else {
                    var formattedTitle = HTMLworkTitle.replace("%data%",
                            job.title);
                }
                var formattedDates = HTMLworkDates.replace("%data%", job.dates);
                var formattedLocation = HTMLworkLocation.replace("%data%",
                        job.location);
                var formattedDescription = HTMLworkDescription.replace("%data%",
                        job.description);

                // Add all formatted work-related info to the page
                $(".work-entry:last").append(formattedEmployer+formattedTitle);
                $(".work-entry:last").append(formattedDates);
                $(".work-entry:last").append(formattedLocation);
                $(".work-entry:last").append(formattedDescription);
            }
        }
    }
};


// A projects-object to store some data about projects I've been working
// on
var projects = {
    "projects": [
        {
            "title": "Movie Trailer Website",
            "dates": "2015",
            "description": "This project is part of the Nanodegree Full Stack Web Developer at Udacity.",
            "images": ["images/projects/nd004p1_1_thumb.png", "images/projects/nd004p1_2_thumb.png"]
        },
        {
            "title": "Mockup to Website",
            "dates": "2015",
            "description": "This project is part of the Nanodegree Front-End Web Developer at Udacity. Based on a mockup given by Udacity, I've made a website that's a pixel-perfect matchup. To achieve this, I've used HTML, CSS and Bootstrap 2.",
            "images": ["images/projects/nd001p1_1_thumb.png", "images/projects/nd001p1_2_thumb.png", "images/projects/nd001p1_3_thumb.png"]
        },
        {
            "title": "Heuristics (University of Amsterdam)",
            "dates": "2013 - present",
            "description": "Grading student submissions for the course Heuristieken (Heuristics)",
            "images": ["images/projects/heuristics_1_thumb.png", "images/projects/heuristics_2_thumb.png"]
        },
        {
            "title": "External Expert for Graduation Sessions @ HvA Amsterdam)",
            "dates": "2009 - present",
            "description": "Grading student thesis for their final internship",
            "images": []
        },
        {
            "title": "Cluster Management Tool (SURFsara)",
            "dates": "2012 - 2014",
            "description": "Built a Django/Python based tool for administration and management of large distributed systems at SURFsara. It's used to store generic information and generate specific configuration files.",
            "images": ["images/projects/cmt_1_thumb.png"]
        }
    ]
};

// Add a function to the projects-object to display its data
projects.display = function() {
    for (var project=0; project<projects.projects.length; project++) {
        // Format the project-data
        var current_project = projects.projects[project];

        var formattedTitle = HTMLprojectTitle.replace("%data%",
                current_project.title);
        var formattedDates = HTMLprojectDates.replace("%data%",
                current_project.dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%",
                current_project.description);

        // Add the project-data to the page
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedDates);
        $(".project-entry:last").append(formattedDescription);

        // Check for images, and add if exists
        // TODO: show bigger version in overlay, after click on
        // thumbnail
        if (current_project.images.length > 0) {
            for (i in current_project.images) {
                var formattedImages = HTMLprojectImage.replace("%data%",
                        current_project.images[i]);
                $(".project-entry:last").append(formattedImages);
            }
        }
    }
};

// An education-object, to store some educational info
var education = {
    "schools": [
        {
            "name": "Amsterdam University of Applied Sciences",
            "location": "Amsterdam, NL",
            "degree": "BA",
            "dates": "2003 - 2008",
            "majors": ["Applied Computer Science", "Game Technology"],
            "url": "http://www.hva.nl/onderwijs/opleidingen/item/technische-informatica.html"
        }
    ],
    "certifications": [
        {
            "title": "Japanese Language Proficiency Test N5",
            "location": "London, UK",
            "organization": "University of London (jointly administered by Japan Foundation and JEES)",
            "dates": "2012",
            "url": "http://jlpt.jp/"
        },
        {
            "title": "Certified Kanban Foundation Training",
            "location": "Baarn, NL",
            "organization": "VX Company (accredited by LeanKanban University)",
            "dates": "2013",
            "url": "http://vxcompany.com/vxacademy/training/training-kanban/"
        },
        {
            "title": "Summer Course Mathematics",
            "location": "Amsterdam, NL",
            "organization": "Hogeschool van Amsterdam",
            "dates": "2003",
            "url": "http://www.hva.nl/onderwijs/opleidingen/content/dmci/game-development/praktische-zaken/toelatingseisen/toelatingseisen.html"
        }
    ],
    "onlineCourses": [
        {
            "title": "Intro to HTML and CSS",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/ud304-nd"
        },
        {
            "title": "Programming Foundations with Python",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/ud036-nd"
        },
        {
            "title": "How to Use Git and GitHub",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/ud775-nd"
        },
        {
            "title": "JavaScript Basics",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/ud804-nd"
        },
        {
            "title": "Intro to jQuery",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/ud245-nd"
        },
        {
            "title": "Full Stack Web Developer Nanodegree",
            "school": "Udacity",
            "dates": "2015 - present",
            "url": "https://www.udacity.com/course/nd004"
        },
        {
            "title": "Front-End Web Developer Nanodegree",
            "school": "Udacity",
            "dates": "2015 - present",
            "url": "https://www.udacity.com/course/nd001"
        }
    ]
};

// A function to display the education-data
education.display = function() {

    if (education.schools.length > 0) {
        // Iterate over schools, if the array has elements
        for (i in education.schools) {
            // First format the data of the current school
            var school = this.schools[i];

            var fmtSchoolName = HTMLschoolName.replace("%data%", school.name);
            var fmtSchoolLocation =
                HTMLschoolLocation.replace("%data%", school.location);
            var fmtSchoolDegree =
                HTMLschoolDegree.replace("%data%", school.degree);
            var fmtSchoolDates =
                HTMLschoolDates.replace("%data%", school.dates);

            // Add the school-data to the page
            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(fmtSchoolName + fmtSchoolDegree);
            $(".education-entry:last").append(fmtSchoolLocation);
            $(".education-entry:last").append(fmtSchoolDates);
            
            // Iterate over majors, if any, and format and display
            for (j in school.majors) {
                var fmtSchoolMajor =
                    HTMLschoolMajor.replace("%data%", school.majors[j]);
                $(".education-entry:last").append(fmtSchoolMajor);
            }
        }
    }

    if (education.certifications.length > 0) {
        $(".education-entry:last").append(HTMLcertifications);
        for (i in education.certifications) {
            var cert = this.certifications[i];

            var fmtCertTitle = HTMLcertificationTitle.replace("%data%", cert.title);
            var fmtCertOrganization = HTMLcertificationOrganization.replace(
                    "%data%", cert.organization);
            var fmtCertLocation = HTMLcertificationLocation.replace("%data%",
                    cert.location);
            var fmtCertDates = HTMLcertificationDates.replace("%data%",
                    cert.dates);
            var fmtCertURL = HTMLcertificationURL.replace("%data%", cert.url);

            $(".education-entry:last").append(fmtCertTitle +
                    fmtCertOrganization);
            $(".education-entry:last").append(fmtCertLocation);
            $(".education-entry:last").append(fmtCertDates);
            $(".education-entry:last").append(fmtCertURL);
        }
    }

    if (education.onlineCourses.length > 0) {
        $(".education-entry:last").append(HTMLonlineClasses);
        for (i in education.onlineCourses) {
            var course = this.onlineCourses[i];

            var fmtOnlineTitle = HTMLonlineTitle.replace("%data%",
                    course.title);
            var fmtOnlineSchool = HTMLonlineSchool.replace("%data%",
                    course.school);
            var fmtOnlineDates = HTMLonlineDates.replace("%data%",
                    course.dates);
            var fmtOnlineURL = HTMLonlineURL.replace("%data%", course.url);

            $(".education-entry:last").append(fmtOnlineTitle + fmtOnlineSchool);
            $(".education-entry:last").append(fmtOnlineDates);
            $(".education-entry:last").append(fmtOnlineURL);
        }
    }
};


bio.display();
work.display();
projects.display();
education.display();



// you want to see a map? here's a map.
$("#mapDiv").append(googleMap);

