// Some notes, in case I want to switch to multiline
// strings, due to the 80-chars limit:
// https://gun.io/blog/multi-line-strings-in-json/

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
        "Nginx", "Amazon Web Services", "Japanese Language", "Vim", "Phonegap"
    ],
    "biopic": "images/fry.jpg"
};

bio.display = function() {
    // Format the personal biographical info
    var formattedName = HTMLheaderName.replace("%data%", this.name);
    var formattedRole = HTMLheaderRole.replace("%data%", this.role);

    // Add all previous info to the page
    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);

    var formattedMobile = HTMLmobile.replace("%data%", this.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", this.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", this.contacts.github);
    var formattedTwitter = HTMLtwitter.replace("%data%", this.contacts.twitter);
    var formattedLocation = HTMLlocation.replace('%data%', this.contacts.location);
    var formattedPicture = HTMLbioPic.replace("%data%", this.biopic);
    var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", this.welcomeMessage);

    $("#topContacts").append(formattedMobile);
    $("#topContacts").append(formattedEmail);
    $("#topContacts").append(formattedGithub);
    $("#topContacts").append(formattedTwitter);
    $('#topContacts').append(formattedLocation);

    $("#header").append(formattedPicture);
    $("#header").append(formattedWelcomeMsg);

    $("#footerContacts").prepend(formattedMobile);
    $("#footerContacts").prepend(formattedEmail);
    $("#footerContacts").prepend(formattedTwitter);
    $("#footerContacts").prepend(formattedGithub);
    $('#footerContacts').prepend(formattedLocation);

    if (this.skills) {
        /* this has been replaced by a skills-cloud in HTMLskillsCloud. **
        $("#header").append(HTMLskillsStart);

        for (i=0; i<this.skills.length; i++) {
            var formattedSkill = HTMLskills.replace("%data%", this.skills[i]);
            $("#skills").append(formattedSkill);
        }
        */
        $('#header').append(HTMLskillsCloud);
        this.show_skills();
    }
}


bio.show_skills = function() {
    var colors = d3.scale.category20();
    var width = document.getElementById('header').offsetWidth-96;
    //var width = document.getElementById('header').clientWidth-96;
    var height = window.innerHeight - document.getElementById('header').offsetHeight;
    //var height = window.innerHeight - document.getElementById('header').clientHeight;
    d3.layout.cloud()
        .size([width, height])
        .words(this.skills.map(function(d) {
            //return {text: d, size: 14 + Math.random() * 30};
            return {text: d, size: 10 + Math.random() * 90};
        }))
        .padding(1)
        // ~~ is a bitwise Math.floor for values > 0, but quicker
        // rotations ranging from 0 to 150 degrees, in steps of 30
        //.rotate(function() { return (~~(Math.random() * 6) -3) * 30; })
        // rotate either 0 or 90 degrees
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Gorditas")
        .fontSize(function(d) { return d.size; })
        .on("end", drawCloud)
        .start();
    function drawCloud(words) {
        d3.select("#cloud").append("svg")
        //d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
           .attr("transform", "translate("+width/2+", "+height/2+")")
            //.attr("transform", "translate(150,150)")
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
}


// A work-object to store some work info
var work = {
    "jobs": [
        {
            "employer": "Nishino",
            "title": "Owner",
            "location": "Amsterdam, NL",
            "dates": "2014 - 2015",
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
            "dates": "2011 - now",
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

work.display = function() {
    if (work.jobs || work.internships) {
        // create div
        $("#workExperience").append(HTMLworkStart);

        var worktype = ["jobs", "internships"];
        for (i in worktype) {
            console.log("worktype:", i);
            for (j in this[worktype[i]]) {
                console.log("job:", j);
                var job = this[worktype[i]][j];

                var formattedEmployer = HTMLworkEmployer.replace("%data%",
                        job.employer);
                if (worktype[i] === "internships") {
                    var formattedTitle = HTMLworkTitle.replace("%data%", job.title+" (internship)");
                } else {
                    var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
                }
                var formattedDates = HTMLworkDates.replace("%data%", job.dates);
                var formattedLocation = HTMLworkLocation.replace("%data%",
                        job.location);
                var formattedDescription = HTMLworkDescription.replace("%data%",
                        job.description);

                $(".work-entry:last").append(formattedEmployer+formattedTitle);
                $(".work-entry:last").append(formattedDates);
                $(".work-entry:last").append(formattedLocation);
                $(".work-entry:last").append(formattedDescription);
            }
        }
    }
}


var projects = {
    "projects": [
        {
            "title": "Movie Trailer Website",
            "dates": "2015",
            "description": "This project is part of the Nanodegree Full Stack Web Developer at Udacity.",
            "images": ["images/logo_udacity.png"] // https://lh4.ggpht.com/dR8q0uh3GoH-kU00KnQ1elSkqBeWi-ZOQ1_14uDxWRACmhrIDQFOfItKdAf7hngoResshnbb9hmVpPuwkjI=s0#w=152&h=152
        },
        {
            "title": "Mockup to Website",
            "dates": "2015",
            "description": "This project is part of the Nanodegree Front-End Web Developer at Udacity. Based on a mockup given by Udacity, I've made a website that's a pixel-perfect matchup. To achieve this, I've used HTML, CSS and Bootstrap 2.",
            "images": ["images/logo_udacity.png"] // https://lh4.ggpht.com/dR8q0uh3GoH-kU00KnQ1elSkqBeWi-ZOQ1_14uDxWRACmhrIDQFOfItKdAf7hngoResshnbb9hmVpPuwkjI=s0#w=152&h=152
        },
        {
            "title": "Heuristics (University of Amsterdam)",
            "dates": "2013 - present",
            "description": "Grading student submissions for the course Heuristieken (Heuristics)",
            "images": ["images/logo_uva.jpg"] // http://static.uva.nl/binaries/content/gallery/logos/p-z/uva-logo_en.jpg
        },
        {
            "title": "External Expert for Graduation Sessions @ HvA Amsterdam)",
            "dates": "2009 - present",
            "description": "Grading student thesis for their final internship",
            "images": []
            //"images": ["images/logo_uva.jpg"] // http://static.uva.nl/binaries/content/gallery/logos/p-z/uva-logo_en.jpg
        },
        {
            "title": "Cluster Management Tool (SURFsara)",
            "dates": "2012 - 2014",
            "description": "Built a Django/Python based tool for administration and management of large distributed systems. It's used to store generic information and generate specific configuration files.",
            "images": ["images/logo_surfsara.png"] // https://surfsara.nl/sites/all/themes/st_sara/logo.png
        }
    ]
};

projects.display = function() {
    for (p in projects.projects) {
        $("#projects").append(HTMLprojectStart);

        var current_project = projects.projects[p];

        var formattedTitle = HTMLprojectTitle.replace("%data%", current_project.title);
        var formattedDates = HTMLprojectDates.replace("%data%", current_project.dates);
        var formattedDescription =
            HTMLprojectDescription.replace("%data%", current_project.description);

        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedDates);
        $(".project-entry:last").append(formattedDescription);

        if (current_project.images.length > 0) {
            for (img in current_project.images) {
                var formattedImages =
                    HTMLprojectImage.replace("%data%", current_project.images[0]);
                $(".project-entry:last").append(formattedImages);
            }
        }
    }
}


// An education-object, to store some educational info
var education = {
    "schools": [
        {
            "name": "Amsterdam University of Applied Sciences",
            "location": "Amsterdam, NL",
            "degree": "BA",
            "dates": "2003 - 2008",
            "majors": ["Applied Computer Science", "Game Technology"],
            "url": "http://www.hva.nl/onderwijs/opleidingen/content/dmci/hbo-ict-technische-informatica/technische-informatica.html"
        }
    ],
    "onlineCourses": [
        {
            "title": "Japanese Language Proficiency Test N5",
            "school": "University of London",
            "dates": "2012",
            "url": "http://jlpt.jp/"
        },
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

education.display = function() {

    if (education.schools.length > 0) {
        for (i in education.schools) {
            $("#education").append(HTMLschoolStart);

            var school = this.schools[i];

            var fmtSchoolName = HTMLschoolName.replace('%data%', school.name);
            var fmtSchoolLocation = HTMLschoolLocation.replace('%data%', school.location);
            var fmtSchoolDegree = HTMLschoolDegree.replace('%data%', school.degree);
            var fmtSchoolDates = HTMLschoolDates.replace('%data%', school.dates);

            $('.education-entry').append(fmtSchoolName + fmtSchoolDegree);
            $('.education-entry').append(fmtSchoolLocation);
            $('.education-entry').append(fmtSchoolDates);
            
            for (j in school.majors) {
                var fmtSchoolMajor = HTMLschoolMajor.replace('%data%', school.majors[j]);
                $('.education-entry').append(fmtSchoolMajor);
            }
        }
    }

    $('.education-entry').append(HTMLonlineClasses);

    if (education.onlineCourses.length > 0) {
        for (i in education.onlineCourses) {
            var course = this.onlineCourses[i];

            var fmtOnlineTitle = HTMLonlineTitle.replace('%data%', course.title);
            var fmtOnlineSchool = HTMLonlineSchool.replace('%data%', course.school);
            var fmtOnlineDates = HTMLonlineDates.replace('%data%', course.dates);
            var fmtOnlineURL = HTMLonlineURL.replace('%data%', course.url);

            $('.education-entry').append(fmtOnlineTitle + fmtOnlineSchool);
            $('.education-entry').append(fmtOnlineDates);
            $('.education-entry').append(fmtOnlineURL);
        }
    }
}


bio.display();
work.display();
projects.display();
education.display();



// you want to see a map? here's a map.
$("#mapDiv").append(googleMap);

