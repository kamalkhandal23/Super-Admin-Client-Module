export default function PrivilegesModal({
  open,
  onClose,
  privileges,
  setPrivileges,
}) {
  if (!open) return null;

  if (!Array.isArray(privileges)) {
    console.error("Privileges is not an array", privileges);
    return null;
  }

  const toggleNode = (nodes, id) => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, enabled: !node.enabled };
      }

      if (Array.isArray(node.children)) {
        return {
          ...node,
          children: toggleNode(node.children, id),
        };
      }

      return node;
    });
  };

  const handleToggle = (id) => {
    setPrivileges((prev) => toggleNode(prev, id));
  };

  const renderNode = (node, level = 0) => {
    return (
      <div key={node.id} style={{ marginLeft: level * 16 }}>
        <label className="flex items-center gap-2 py-1">
          <input
            type="checkbox"
            checked={!!node.enabled}
            onChange={() => handleToggle(node.id)}
          />
          <span>{node.displayName}</span>
        </label>

        {Array.isArray(node.children) &&
          node.children.map((child) =>
            renderNode(child, level + 1)
          )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] max-h-[80vh] rounded p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">
          Select Privileges
        </h2>

        <div className="overflow-y-auto flex-1 border p-2">
          {privileges.map((node) => renderNode(node))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
