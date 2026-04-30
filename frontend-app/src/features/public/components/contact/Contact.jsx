export default function Contact() {
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input placeholder="Nombre" />
      <input placeholder="Email" />
      <textarea placeholder="Mensaje"></textarea>
      <button>Enviar</button>
    </form>
  );
}