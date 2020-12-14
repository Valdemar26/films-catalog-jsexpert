import { ModalTypeEnum, NotificationTypeEnum } from '../enum/notification-type.enum';

export interface NotificationInterface {
  title: string;
  text: string;
  notificationType?: NotificationTypeEnum.Error;
  modalType?: ModalTypeEnum.Error;
  icon: any;
}
