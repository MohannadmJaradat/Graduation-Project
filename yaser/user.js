document.querySelector('.create-event-advanced-back-button').addEventListener('click', async () => {
    const loc =localStorage.getItem("where")
    if(loc=="mycon"){
        window.location.href="../my-conferences/my-conferences.html"

    }else if(loc=="con"){
        window.location.href="../conferences/conferences.html"

    }else if(loc=="scon"){
        window.location.href="../conferences/searchconferences.html"

    }else if(loc=="uhp"){
        window.location.href="../Homepage/user-homepage.html"

    }else if(loc=="author-no-abstract"){
        window.location.href="../author/author-no-abstract.html"

    }else if(loc=="author"){
        window.location.href="../author/author.html"

    }else if(loc=="manager"){
        window.location.href="../manager/manager.html"

    }else if(loc=="reviewer-no-absract"){
        window.location.href="../Reviewer/reviewer-no-absract.html"

    }else if(loc=="reviewer"){
        window.location.href="../Reviewer/reviewer.html"

    }else if(loc=="Sub-reviewer-no-abstract"){
        window.location.href="../Sub-reviewer/Sub-reviewer-no-abstract.html"

    }else if(loc=="Sub-reviewer"){
        window.location.href="../Sub-reviewer/Sub-reviewer.html"

    }else if(loc=="supervisor"){
        window.location.href="../supervisor/supervisor.html"

    }
});