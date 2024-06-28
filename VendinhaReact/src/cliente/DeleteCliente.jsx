export default function DeleteCliente(cliente, onClose) {
  return (
    <div className="modal">
      <h2>Tem certeza que deseja excluir {cliente.id}?</h2>
    </div>
  );
}
