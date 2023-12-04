export const getUnreadNotifications = (allNotifications) => {
  const unreadNotifications = allNotifications.filter(
    (notification) => notification.isRead === false
  );
  return unreadNotifications;
};
