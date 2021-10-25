import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Provider } from "@modules/accounts/infra/typeorm/entities/Provider";
import { STATUS_PROVIDERS_APPOINTMENT } from "@modules/appointments/enums/StatusProvidersAppointment.enum";
import { Appointment } from "@modules/appointments/infra/typeorm/entities/Appointment";

@Entity("appointments_providers")
export class AppointmentProvider {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: "provider_id", referencedColumnName: "id" })
  provider: Provider;

  @Column()
  appointment_id: string;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: "appointment_id", referencedColumnName: "id" })
  appointment: Appointment;

  @Column({ type: "enum", enum: STATUS_PROVIDERS_APPOINTMENT })
  status: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
