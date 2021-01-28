export const Notification = ({ notify }) => {
  if (notify.message === null && notify.type === null) {
    return null;
  }

  return <div className={`notification__style ${notify.type}`}>{notify.message}</div>;
};
