// Some notes, in case I want to switch to multiline
// strings, due to the 80-chars limit:
// https://gun.io/blog/multi-line-strings-in-json/

// A work-object to store some work info
var work = {
    "jobs": [
        {
            "employer": "Nishino",
            "title": "Owner",
            "location": "Amsterdam, NL",
            "dates": "2014 - 2015",
            "description": "Freelance IT-consultancy."
        },
        {
            "employer": "SURFsara",
            "title": "System Programmer",
            "location": "Amsterdam, NL",
            "dates": "2008 - 2014",
            "description": "System administration on several HPC clusters."
        }
    ]
};


var projects = {
    "projects": [
        {
            "title": "Heuristics (University of Amsterdam)",
            "dates": "2013 - now",
            "description": "Grading student submissions for the course Heuristieken (Heuristics)",
            "images": []
        },
        {
            "title": "Head of Security and System Infrastructure (Qardio, Inc.)",
            "dates": "2014 - 2015",
            "description": "DevOps and compliancy kinda things.",
            "images": []
        },
        {
            "title": "Cluster Management Tool (SURFsara)",
            "dates": "2012 - 2014",
            "description": "Built a Django/Python based tool for administration and management of large distributed systems. It's used to store generic information and generate specific configuration files.",
            "images": []
        }
    ]
};

// A bio-object to store some personal biographical info
var bio = {
    "name": "Sil Westerveld",
    "role": "Freelance Hacker",
    "contacts": {
        "mobile": "+31(0)6 24 25 36 37",
        "email": "contact@silwesterveld.com",
        "github": "swesterveld",
        "twitter": "@swesterveld",
        "location": "Amsterdam, NL"
        //"blog": "http://blog.silwesterveld.com/",
    },
    //"picture": "images/fry.jpg",
    "welcomeMessage" : "Hello world! This is the resume I've built while following a JavaScript Basics course at Udacity.com. This course is part of the curriculum for the Nanodegree Front-End Web Developer, which I'm enrolled in.",
    "skills": [
        "Awesomeness", "Python", "JS", "Bash", "Apache", "Nginx", "Debian",
        "Distributed Systems", "High Performance Computing", "Unix", "Git",
        "GNU tools", "MySQL", "PostgreSQL", "Kanban", "LaTeX", "CFEngine",
        "System Administration", "Configuration Management", "Scripting"
    ]
};

// An education-object in bracket notation, to store some educational info
var education = {
    "schools": [
        {
            "name": "Amsterdam University of Applied Sciences",
            "location": "Amsterdam, NL",
            "degree": "B.ICT",
            "dates": "2003 - 2008",
            "majors": ["Applied Computer Science"],
            //"minor": "Game Technology",
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
            "url": "https://www.udacity.com/course/ud304"
        },
        {
            "title": "Full Stack Web Developer Nanodegree",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/nd004"
        },
        {
            "title": "Front-End Web Developer Nanodegree",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/nd001"
        }
    ]
};

if (bio.skills) {
    $("#header").append(HTMLskillsStart);

    for (i=0; i<bio.skills.length; i++) {
        var formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
        $("#skills").append(formattedSkill);
    }
}

for (job in work.jobs) {

}

var displayWork = function() {
    // create div
    $("#workExperience").append(HTMLworkStart);
    var formattedEmployer = HTMLworkEmployer.replace("%data%",
            work.jobs[job].employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
    var formattedLocation = HTMLworkLocation.replace("%data%",
            work.jobs[job].location);
    var formattedDescription = HTMLworkDescription.replace("%data%",
            work.jobs[job].description);

    $(".work-entry:last").append(formattedEmployer+formattedTitle);
    $(".work-entry:last").append(formattedDates);
    $(".work-entry:last").append(formattedLocation);
    $(".work-entry:last").append(formattedDescription);
}

/*
// Format the personal biographical info
var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);

var formattedWorkEmployer = HTMLworkEmployer.replace("%data%", work["employer"])
        + HTMLworkTitle.replace("%data%", work["position"]);

// Add all previous info to the page
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);

$("#topContacts").append(formattedMobile);
$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedTwitter);
$("#topContacts").append(formattedGithub);
$("#topContacts").append(formattedBlog);

$("#header").append(formattedPicture);
$("#header").append(formattedWelcomeMsg);
$("#header").append(HTMLskillsStart);

var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
var formattedPicture = HTMLbioPic.replace("%data%", bio.picture);
//var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
//var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMsg);

var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
var formattedPicture = HTMLbioPic.replace("%data%", bio.picture);
var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMsg);


$("#workExperience").append(HTMLworkStart);
$(".work-entry").append(work["position"]);

$("#education").append(HTMLschoolStart);
$(".education-entry").append(education.name);

$("#footerContacts").prepend(formattedTwitter);
$("#footerContacts").prepend(formattedGithub);
*/
