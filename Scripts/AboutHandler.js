function clicked() {
    let form = document.getElementById("answer").value;
    let p = document.getElementById("reply");
    if (form.toLowerCase() !== 'no') {
        p.innerHTML = "Expected answer : No<br>Your answer : " + form;
    } else {
        p.innerHTML = "Okay, then. I'll keep my secrets...";
    }
    console.log(form);
}
