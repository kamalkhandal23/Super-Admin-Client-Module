  import SchemaForm from "../../components/SchemaForm";
  import { CLIENT_FORM_SCHEMA } from "./schemas/clientForm.schema";

  export default function ClientForm({ onClose }) {
    const handleSubmit = (data) => {
      console.log("CLIENT DATA:", data);
      alert("Client Created Successfully");
      onClose();
    };

    return (
      <SchemaForm
        schema={CLIENT_FORM_SCHEMA}
        onSubmit={handleSubmit}
      />
    );
  }
