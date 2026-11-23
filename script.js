document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('pedidoForm');
	if (!form) return;

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const nombre      = document.getElementById('nombre').value.trim();
		const correo      = document.getElementById('correo').value.trim();
		const whatsapp    = document.getElementById('whatsapp').value.trim();
		const direccion   = document.getElementById('direccion').value.trim();
		const descripcion = document.getElementById('descripcion').value.trim();
		const pago        = document.getElementById('pago').value;
		const entrega     = document.getElementById('entrega').value;

		if (!nombre || !correo || !whatsapp || !descripcion || !pago || !entrega) {
			alert('Por favor completa todos los campos obligatorios.');
			return;
		}

		if (!/^[0-9]{10}$/.test(whatsapp)) {
			alert('El WhatsApp debe tener exactamente 10 dígitos.');
			return;
		}

		if (entrega === 'Envío a domicilio' && !direccion) {
			alert('Para envío a domicilio necesitamos tu dirección.');
			return;
		}

		const numeroPizzeria = '522291347441';

		const mensaje =
			`*Nuevo Pedido* 🍕\n\n` +
			`*Nombre:* ${nombre}\n` +
			`*Correo:* ${correo}\n` +
			`*WhatsApp:* ${whatsapp}\n` +
			`*Dirección:* ${entrega === 'Pasar por la pizza' ? 'Recoge en sucursal' : direccion}\n\n` +
			`*Pizza:* ${descripcion}\n\n` +
			`*Forma de pago:* ${pago}\n` +
			`*Entrega:* ${entrega}`;

		const url = `https://wa.me/${numeroPizzeria}?text=${encodeURIComponent(mensaje)}`;
		window.open(url, '_blank');

		mostrarConfirmacion();
		form.reset();
	});

	function mostrarConfirmacion() {
		const aviso = document.createElement('div');
		aviso.textContent = '✅ Pedido preparado. Abre WhatsApp y presiona enviar para completarlo.';
		aviso.style.position = 'fixed';
		aviso.style.bottom = '20px';
		aviso.style.left = '50%';
		aviso.style.transform = 'translateX(-50%)';
		aviso.style.background = '#FFD600';
		aviso.style.color = '#1D202B';
		aviso.style.padding = '14px 24px';
		aviso.style.borderRadius = '100px';
		aviso.style.fontWeight = '700';
		aviso.style.fontSize = '15px';
		aviso.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
		aviso.style.zIndex = '9999';
		aviso.style.maxWidth = '90%';
		aviso.style.textAlign = 'center';
		aviso.style.transition = 'opacity 0.4s ease';

		document.body.appendChild(aviso);

		setTimeout(function () {
			aviso.style.opacity = '0';
			setTimeout(function () {
				aviso.remove();
			}, 400);
		}, 4000);
	}
});