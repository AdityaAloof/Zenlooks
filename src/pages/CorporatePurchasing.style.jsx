// styles.js
const styles = {
  bulkPurchaseContainer: {
    padding: '40px',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  bulkPurchaseContainerHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  bulkPurchaseContainerH1: {
    color: '#0f3460',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 700,
  },
  bulkPurchaseContainerP: {
    fontSize: '16px',
    color: '#555',
    lineHeight: 1.6,
  },
  bulkPurchaseForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '30px 0',
  },
  bulkPurchaseFormInput: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  },
  bulkPurchaseFormInputFocus: {
    borderColor: '#0f3460',
    outline: 'none',
  },
  bulkPurchaseFormButton: {
    padding: '12px 15px',
    backgroundColor: '#0f3460',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  bulkPurchaseFormButtonHover: {
    backgroundColor: '#ff6f61',
    transform: 'translateY(-1px)',
  },
  loading: {
    color: '#0f3460',
    fontSize: '16px',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: '16px',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default styles;
