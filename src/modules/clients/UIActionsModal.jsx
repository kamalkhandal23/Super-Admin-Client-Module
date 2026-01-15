export default function UIActionsModal({
  uiActions = [],
  setUiActions,
}) {
  if (!Array.isArray(uiActions)) return null;

  const toggleParent = (pIdx) => {
    const updated = structuredClone(uiActions);
    const parent = updated[pIdx];
    const value = !parent.enabled;

    parent.enabled = value;
    parent.children?.forEach((c) => (c.enabled = value));

    setUiActions(updated);
  };

  const toggleChild = (pIdx, cIdx) => {
    const updated = structuredClone(uiActions);
    updated[pIdx].children[cIdx].enabled =
      !updated[pIdx].children[cIdx].enabled;
    setUiActions(updated);
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-h-[55vh] overflow-y-auto">
      {uiActions.map((parent, pIdx) => (
        <div
          key={parent.id}
          className="border rounded-md bg-slate-50 p-4"
        >
          <label className="flex items-center gap-2 font-medium text-sm mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!parent.enabled}
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
                  checked={!!child.enabled}
                  onChange={() => toggleChild(pIdx, cIdx)}
                />
                {child.displayName}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
