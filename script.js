async function testBackend() {
    const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            career: "Full Stack Developer",
            skills: {
                HTML: 70,
                CSS: 50,
                JavaScript: 60,
                React: 30,
                NodeJS: 20,
                SQL: 40
            }
        })
    });

    const result = await response.json();

    console.log("Backend response:", result);
}

testBackend();
const getStartedBtn = document.getElementById("getStartedBtn");

getStartedBtn.addEventListener("click", function() {
    window.location.href = "login.html";
});