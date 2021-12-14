import React from "react";

const BuyUpload = ({ ttoogleStep, step, toogleDocumentsoogleStep }) => {
  const [documents, setDocuments] = useState([]);

  const onSelectDocs = async (e) => {
    const documents = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < documents.length; i++) {
      formData.append("documents", documents[i]);
    }
    const response = await authService.saveDocuments(formData);
    setDocuments(response.data);
  };

  const send = (e) => {
    e.preventDefault();
    toogleDocuments(documents);
    toogleStep(step + 1);
  };
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>
          <h3>Documents Upload</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={send}>
          <Form.Group>
            <Form.Label>Upload Documents</Form.Label>
            <Form.Control type="file" multiple onChange={onSelectDocs} />
          </Form.Group>
          <div className="bottom-btn">
            <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
              Previous
            </button>
            <button className="nxt-btn" type="submit" onClick={send}>
              Next
            </button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
