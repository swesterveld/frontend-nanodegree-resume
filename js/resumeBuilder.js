var bio = {
    "name": "Sil Westerveld",
    "role": "Web Developer",
    "contacts": {
        "mobile": "+31(0)6 24 25 36 37",
        "email": "contact@silwesterveld.com",
        "twitter": "@swesterveld",
        "github": "swesterveld",
        "blog": "http://blog.silwesterveld.com/",
        "location": "Amsterdam, NL"
    },
    "picture": "images/fry.jpg",
    "welcomeMsg" : "Hello world! This is the resume I've built while "
        + "following a JavaScript Basics course at Udacity.com. This course "
        + "is part of the curriculum for the Nanodegree Front-End Web "
        + "Developer, which I'm enrolled in.",
    "skills": [
        "Awesomeness", "Python", "JS", "Bash", "Apache", "Nginx", "Debian",
        "Distributed Systems", "High Performance Computing", "Unix", "Git",
        "GNU tools", "MySQL", "PostgreSQL", "Kanban", "LaTeX", "CFEngine",
        "System Administration", "Configuration Management", "Scripting"
    ]
};

var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
var formattedPicture = HTMLbioPic.replace("%data%", bio.picture);
var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMsg);

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

for (i=0; i<bio.skills.length; i++) {
    var formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
    $("#skills").append(formattedSkill);
}

$("#footerContacts").prepend(formattedTwitter);
$("#footerContacts").prepend(formattedGithub);

