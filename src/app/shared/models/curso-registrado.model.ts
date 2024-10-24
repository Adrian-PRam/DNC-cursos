export interface CursoRegistrado {
  id: number;
  nombreCurso: string;
  tipo: string;
  integrantes: number;
  fecha: string | Date;
  costo: number;
}
