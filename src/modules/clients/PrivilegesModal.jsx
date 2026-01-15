export default function PrivilegesModal({
  open,
  onClose,
  privileges,
  setPrivileges,
}) {
  if (!open) return null;


  const toggleChild = (parentIndex, childIndex) => {
    const updated = structuredClone(privileges);
    updated[parentIndex].children[childIndex].enabled =
      !updated[parentIndex].children[childIndex].enabled;
    setPrivileges(updated);
  };

  const toggleParent = (parentIndex) => {
    const updated = structuredClone(privileges);
    const parent = updated[parentIndex];
    const newValue = !parent.enabled;

    parent.enabled = newValue;
    parent.children?.forEach((c) => (c.enabled = newValue));

    setPrivileges(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-[1000px] max-h-[85vh] rounded-lg shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select Privileges</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto grid grid-cols-3 gap-4">
          {privileges.map((parent, pIdx) => (
            <div
              key={parent.id}
              className="border rounded-md bg-slate-50 p-4"
            >
          
              <label className="flex items-center gap-2 font-medium text-sm mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={parent.enabled}
                  onChange={() => toggleParent(pIdx)}
                />
                {parent.displayName}
              </label>

              <div className="ml-5 space-y-1">
                {parent.children?.map((child, cIdx) => (
                  <label
                    key={child.id}
                    className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={child.enabled}
                      onChange={() => toggleChild(pIdx, cIdx)}
                    />
                    {child.displayName}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border rounded text-sm"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
