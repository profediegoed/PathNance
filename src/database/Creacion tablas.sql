-- =============================================================================
-- diagram name: crecerapp
-- created on: 23/08/2024 2:51:03 p. m.
-- diagram version: 
-- =============================================================================

drop table if exists validacion cascade;

create table validacion (
	id_validacion bigserial not null,
	estado varchar(30) not null,
	primary key(id_validacion)
);


drop table if exists rol cascade;

create table rol (
	id_rol bigserial not null,
	rol varchar(30) not null,
	primary key(id_rol)
);


drop table if exists mision cascade;

create table mision (
	id_mision bigserial not null,
	nombre int4 not null,
	descripcion varchar(100) not null,
	primary key(id_mision)
);


drop table if exists usuario cascade;

create table usuario (
	id_usuario bigserial not null,
	nombre varchar(50) not null,
	correo varchar(35) not null,
	contrasena varchar(100),
	constraint info_usuario unique(correo,nombre),
	constraint info_usuario unique(correo,nombre),
        primary key(id_usuario)
);


drop table if exists status cascade;

create table status (
	id_status bigserial not null,
	nombre varchar(15) not null,
	primary key(id_status)
);


drop table if exists path cascade;

create table path (
	id_path bigserial not null,
	nombre varchar(20) not null,
	estado varchar(15) not null,
	progreso int4,
	primary key(id_path)
);


drop table if exists asignacion_statususuario cascade;

create table asignacion_statususuario (
	id_asignacionstatus bigserial not null,
	id_usuario int8 not null,
	id_status int8 not null,
	primary key(id_asignacionstatus)
);


drop table if exists asignacion_rol cascade;

create table asignacion_rol (
	id_asignacionrol bigserial not null,
	id_rol int8 not null,
	id_usuario int8 not null,
	primary key(id_asignacionrol)
);


drop table if exists asignacionpath cascade;

create table asignacionpath (
	id_asignacionpath bigserial not null,
	id_path int8 not null,
	id_usuario int8 not null,
	primary key(id_asignacionpath)
);


drop table if exists validacion_path cascade;

create table validacion_path (
	id_validacionpath bigserial not null,
	id_validacion int8 not null,
	id_path int8 not null,
	primary key(id_validacionpath)
);


drop table if exists asignacion_misiones cascade;

create table asignacion_misiones (
	id_asignmision bigserial not null,
	id_mision int8 not null,
	id_path int8 not null,
	primary key(id_asignmision)
);


drop table if exists validacion_mision cascade;

create table validacion_mision (
	id_validacionmi bigserial not null,
	id_mision int8 not null,
	id_validacion int8 not null,
	primary key(id_validacionmi)
);


drop table if exists asignacion_statuspath cascade;

create table asignacion_statuspath (
	id_asignacionstatus bigserial not null,
	id_path int8 not null,
	id_status int8 not null,
	primary key(id_asignacionstatus)
);



alter table asignacion_statususuario add constraint ref_asignacion_status_to_usuario foreign key (id_usuario)
	references usuario(id_usuario)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacion_statususuario add constraint ref_asignacion_status_to_status foreign key (id_status)
	references status(id_status)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacion_rol add constraint ref_asignacion_rol_to_rol foreign key (id_rol)
	references rol(id_rol)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacion_rol add constraint ref_asignacion_rol_to_usuario foreign key (id_usuario)
	references usuario(id_usuario)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacionpath add constraint ref_asignacionpath_to_path foreign key (id_path)
	references path(id_path)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacionpath add constraint ref_asignacionpath_to_usuario foreign key (id_usuario)
	references usuario(id_usuario)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table validacion_path add constraint ref_asignacion_validacion_to_validacion foreign key (id_validacion)
	references validacion(id_validacion)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table validacion_path add constraint ref_asignacion_validacion_to_path foreign key (id_path)
	references path(id_path)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacion_misiones add constraint ref_asignacion_misiones_to_mision foreign key (id_mision)
	references mision(id_mision)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacion_misiones add constraint ref_asignacion_misiones_to_path foreign key (id_path)
	references path(id_path)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table validacion_mision add constraint ref_validacion_mision_to_mision foreign key (id_mision)
	references mision(id_mision)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table validacion_mision add constraint ref_validacion_mision_to_validacion foreign key (id_validacion)
	references validacion(id_validacion)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacion_statuspath add constraint ref_asignacion_statuspath_to_path foreign key (id_path)
	references path(id_path)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table asignacion_statuspath add constraint ref_asignacion_statuspath_to_status foreign key (id_status)
	references status(id_status)
	match simple
	on delete no action
	on update no action
	not deferrable;


