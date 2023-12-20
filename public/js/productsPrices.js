const radioButtons = document.querySelectorAll('.radio-input input[type="radio"]');

radioButtons.forEach(button => {
    button.addEventListener('change', function () {
        document.querySelectorAll('.price-label').forEach(label => {
            label.classList.remove('selected');
        });

        if (this.checked) {
            const label = this.parentElement;
            label.classList.add('selected');
        }
    });
});
