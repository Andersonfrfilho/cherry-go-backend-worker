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
import { Service } from "@modules/accounts/infra/typeorm/entities/Services";
import { Appointment } from "@modules/appointments/infra/typeorm/entities/Appointment";

@Entity("appointments_providers_services")
export class AppointmentProviderService {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider, { eager: true })
  @JoinColumn({ name: "provider_id" })
  provider: Provider;

  @Column()
  appointment_id: string;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: "appointment_id" })
  appointment: Appointment;

  @Column()
  service_id: string;

  @ManyToOne(() => Service, { eager: true })
  @JoinColumn({ name: "service_id", referencedColumnName: "id" })
  service: Service;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
