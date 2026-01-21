import nodemailer from "nodemailer";

const teacherEmail = process.env.TEACHER_MAIL;
const directorEmail = process.env.DIRECTOR_MAIL;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

export async function sendAttendanceMail(student, course, type) {
    const mail = buildMail(student, course, type);
    await transporter.sendMail(mail);
}

function buildMail(student, course, type) {
    const subject =
        type === "WARNING" ? `Advertencia por fallas - ${course.name}` : `Pérdida por fallas - ${course.name}`;

    const text = type === "WARNING" ? `Estimado/a ${student.name},
    Usted ha alcanzado ${student.absences} inasistencias en el curso
    "${course.name}". Está a una inasistencia de perder la asignatura
    por fallas.
    Por favor tenga en cuenta esta situación.` 
    : 
    `Estimado/a ${student.name},Usted ha alcanzado ${student.absences} inasistencias en el curso
    "${course.name}", superando el límite permitido (${course.sessionsLost}).
    De acuerdo con la normativa, ha perdido la asignatura por fallas.`;

    return {
        from: process.env.MAIL_USER,
        to: student.email,
        cc: [teacherEmail, directorEmail],
        subject,
        text
    };
}