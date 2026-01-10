import Modal from "../../components/Modal";

export default function UIActionsModal({
  open,
  onClose,
  uiActions,
  setUiActions,
}) {
  const toggleModule = (moduleKey) => {
    const updated = { ...uiActions };
    updated[moduleKey].enabled = !updated[moduleKey].enabled;

    updated[moduleKey].actions.forEach(
      (a) => (a.enabled = updated[moduleKey].enabled)
    );

    setUiActions(updated);
  };

  const toggleAction = (moduleKey, index) => {
    const updated = { ...uiActions };
    updated[moduleKey].actions[index].enabled =
      !updated[moduleKey].actions[index].enabled;
    setUiActions(updated);
  };

  return (
    <Modal open={open} onClose={onClose} title="UI Actions">
      <div className="space-y-4">
        {Object.entries(uiActions).map(
          ([moduleKey, module]) => (
            <div
              key={moduleKey}
              className="border rounded p-3"
            >
              <label className="flex items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  checked={module.enabled}
                  onChange={() => toggleModule(moduleKey)}
                />
                {moduleKey}
              </label>

              <div className="ml-6 mt-2 space-y-1">
                {module.actions.map((action, i) => (
                  <label
                    key={action.key}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={action.enabled}
                      onChange={() =>
                        toggleAction(moduleKey, i)
                      }
                    />
                    {action.displayName}
                  </label>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="text-right mt-4">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Save UI Actions
        </button>
      </div>
    </Modal>
  );
}
