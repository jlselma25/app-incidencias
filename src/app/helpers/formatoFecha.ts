

export function formatearFecha(fecha: string): string {
    const date = new Date(fecha); // Convierte la cadena a un objeto Date
    const dia = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
    const año = date.getFullYear(); // Obtiene el año
  
    return `${dia}/${mes}/${año}`;
  }



