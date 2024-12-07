class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
        `
     <footer>
        <div class="footerBottom">
            <span style="color: #fff">Created by @ </span>
    <span>Kawsar Ahmed</span>
    <span style="color: #fff"> | </span>
    <a href="https://github.com/ScriptGlitch/Exam-Schedule/" target="_blank">Source Code</a>
        </div>
    </footer>
        `
    }
}
customElements.define('my-footer', MyFooter)


