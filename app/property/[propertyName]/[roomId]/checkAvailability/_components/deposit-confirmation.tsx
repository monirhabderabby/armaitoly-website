interface Props {
  depositAmount: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const DepositConfirmation = ({}: Props) => {
  return <div>DepositConfirmation</div>;
};

export default DepositConfirmation;
