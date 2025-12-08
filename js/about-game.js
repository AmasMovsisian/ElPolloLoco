const texts = {
  en: {
    title: "About the Game",
    description:
      "This Jump-and-Run adventure is inspired by classics like El Pollo Loco. Your mission is to control the character Pepe, explore the world, collect items, defeat enemies, and face the mighty end boss. The game features modern animations, sound effects, and intuitive controls for both desktop and mobile devices.",
    howToPlay: [
      "Use keyboard or touch controls to move, jump, and attack.",
      "Collect coins and bottles to increase your resources.",
      "Avoid or defeat enemies by jumping on them or throwing a bottle.",
      "Keep an eye on your health bar – if it reaches zero, the game is over.",
      "You can mute all sounds at any time using the mute button.",
      "After a game over, you can restart or return to the home screen.",
    ],
    controls: [
      "← or A – move left",
      "→ or D – move right",
      "↑, W, or Space – jump",
      "F – throw a bottle to attack",
    ],
    credits:
      "This game was created as a coding project. For more details about the provider, privacy, and legal information, check out our ",
    privacyPolicy: "Privacy Policy",
    backToHome: "Back to Home",
    howToPlayTitle: "How to Play",
  },
  de: {
    title: "Über das Spiel",
    description:
      "Dieses Jump-and-Run-Abenteuer ist inspiriert von Klassikern wie El Pollo Loco. Du steuerst den Charakter Pepe, erkundest die Welt, sammelst Items, besiegst Gegner und trittst einem mächtigen End-Boss gegenüber. Das Spiel bietet moderne Animationen, Soundeffekte und intuitive Steuerung für Desktop- und Mobilgeräte.",
    howToPlay: [
      "Benutze Tastatur- oder Touch-Steuerung, um dich zu bewegen, zu springen und anzugreifen.",
      "Sammle Münzen und Flaschen, um deine Ressourcen zu erhöhen.",
      "Weiche Gegnern aus oder besiege sie durch Sprünge oder indem du eine Flasche wirfst.",
      "Achte auf deine Lebensanzeige – wenn sie null erreicht, ist das Spiel vorbei.",
      "Du kannst jederzeit alle Sounds über den Lautlos-Button stummschalten.",
      "Nach einem Game Over kannst du das Spiel neu starten oder zum Startbildschirm zurückkehren.",
    ],
    controls: [
      "← oder A – nach links laufen",
      "→ oder D – nach rechts laufen",
      "↑, W oder Leertaste – springen",
      "F – Flasche werfen, um anzugreifen",
    ],
    credits:
      "Dieses Spiel wurde als Programmierprojekt entwickelt. Weitere Details zum Anbieter, Datenschutz und rechtliche Informationen findest du in unserer ",
    privacyPolicy: "Datenschutzerklärung",
    backToHome: "Zurück zum Hauptmenü",
    howToPlayTitle: "Wie man spielt",
  },
  es: {
    title: "Acerca del juego",
    description:
      "Esta aventura de salto y carrera está inspirada en clásicos como El Pollo Loco. Tu misión es controlar al personaje Pepe, explorar el mundo, recolectar objetos, derrotar enemigos y enfrentarte al poderoso jefe final. El juego cuenta con animaciones modernas, efectos de sonido y controles intuitivos tanto para escritorio como para dispositivos móviles.",
    howToPlay: [
      "Usa los controles del teclado o la pantalla táctil para moverte, saltar y atacar.",
      "Recoge monedas y botellas para aumentar tus recursos.",
      "Evita o derrota a los enemigos saltando sobre ellos o lanzando una botella.",
      "Mantén un ojo en tu barra de salud: si llega a cero, el juego termina.",
      "Puedes silenciar todos los sonidos en cualquier momento usando el botón de silencio.",
      "Después de un Game Over, puedes reiniciar el juego o regresar a la pantalla principal.",
    ],
    controls: [
      "← o A – moverse hacia la izquierda",
      "→ o D – moverse hacia la derecha",
      "↑, W o Espacio – saltar",
      "F – lanzar una botella para atacar",
    ],
    credits:
      "Este juego fue creado como un proyecto de programación. Para más detalles sobre el proveedor, la privacidad y la información legal, consulta nuestra ",
    privacyPolicy: "Política de Privacidad",
    backToHome: "Volver al inicio",
    howToPlayTitle: "Cómo jugar",
  },
};

function changeLanguage(lang) {
  document.title = texts[lang].title;
  document.getElementById("game-description").innerHTML = `
        <h2>${texts[lang].title}</h2>
        <p>${texts[lang].description}</p>
    `;
  document.getElementById("how-to-play").innerHTML = `
        <h2>${texts[lang].howToPlayTitle}</h2>
        <ul>
            ${texts[lang].howToPlay.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    `;
  document.getElementById("controls").innerHTML = `
        <h2>Controls</h2>
        <ul>
            ${texts[lang].controls.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    `;
  document.getElementById("credits").innerHTML = `
        <h2>Credits & Legal</h2>
        <p>${texts[lang].credits}<a href="./privacy-policy.html" style="color:#ffcc00;">${texts[lang].privacyPolicy}</a>.</p>
    `;
  document.querySelector(".back-btn").textContent = texts[lang].backToHome;
}
