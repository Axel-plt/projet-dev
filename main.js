document.addEventListener("DOMContentLoaded", () => {
    const statsTableBody = document.getElementById("player-stats");
    const addPlayerButton = document.getElementById("addPlayer");
    const exportCSVButton = document.querySelector(".export-csv");
    const exportPDFButton = document.querySelector(".export-pdf");

    let playerCount = 0;

    // Fonction pour créer une ligne de joueur
    const createPlayerRow = () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" placeholder="Nom" class="player-input"></td>
            <td><input type="number" value="0" min="0" step="1" class="player-stat"></td>
            <td><input type="number" value="0" min="0" step="1" class="player-stat"></td>
            <td><input type="number" value="0" min="0" step="1" class="player-stat"></td>
            <td><button class="delete-btn-danger">X</button></td>
        `;

        // Ajouter un écouteur pour le bouton supprimer dans la ligne
        row.querySelector(".delete-btn-danger").addEventListener("click", () => {
            row.remove();
            playerCount--;
        });

        return row;
    };

    // Ajouter un joueur
    addPlayerButton.addEventListener("click", () => {
        if (playerCount >= 12) {
            alert("Vous ne pouvez pas ajouter plus de 12 joueurs.");
            return;
        }
        const row = createPlayerRow();
        statsTableBody.appendChild(row);
        playerCount++;
    });

    // Exporter au format CSV
    exportCSVButton.addEventListener("click", () => {
        const rows = Array.from(statsTableBody.querySelectorAll("tr"));
        const data = rows.map(row =>
            Array.from(row.querySelectorAll("input")).map(input => input.value)
        );

        const csvContent = "data:text/csv;charset=utf-8," +
            data.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);

        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "stats.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
    });

    // Exporter au format PDF
    exportPDFButton.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.text("Statistiques des Joueurs", 10, 10);

        let y = 20;
        statsTableBody.querySelectorAll("tr").forEach((row, index) => {
            const values = Array.from(row.querySelectorAll("input")).map(input => input.value);
            doc.text(`${index + 1}. ${values.join(" | ")}`, 10, y);
            y += 10;
        });

        doc.save("stats.pdf");
    });
});
