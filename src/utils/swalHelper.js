import Swal from 'sweetalert2';

export const confirmDelete = (title, text) => {
  return Swal.fire({
    title: title || '¿Estás seguro?',
    text: text || "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1e3a8a', // Kaiser Blue
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    background: '#ffffff',
    customClass: {
      popup: 'animated fadeInDown'
    }
  });
};

export const successMsg = (title, text) => {
  return Swal.fire({
    title: title || '¡Éxito!',
    text: text || 'La operación se realizó correctamente.',
    icon: 'success',
    confirmButtonColor: '#1e3a8a',
  });
};
