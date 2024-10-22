import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const registerForPushNotificationsAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert("Se requieren permisos para enviar notificaciones.");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);
  return token;
};
