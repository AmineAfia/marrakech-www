import { betterAuth } from "better-auth";
import {
	bearer,
	admin,
	multiSession,
	organization,
	twoFactor,
	oneTap,
	oAuthProxy,
	openAPI,
	customSession,
	deviceAuthorization,
	lastLoginMethod,
	apiKey,
} from "better-auth/plugins";
import { reactInvitationEmail } from "./email/invitation";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { reactResetPasswordEmail } from "./email/reset-password";
import { resend } from "./email/resend";
import { MysqlDialect, PostgresDialect, Kysely } from "kysely";
import { createPool } from "mysql2/promise";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "better-auth/plugins/passkey";

const from = process.env.BETTER_AUTH_EMAIL || "delivered@resend.dev";
const to = process.env.TEST_EMAIL || "";

const db = (() => {
	if (process.env.USE_POSTGRES || process.env.MYSQL_DATABASE_URL) {
		if (!process.env.MYSQL_DATABASE_URL) {
			throw new Error(
				"Using PostgreSQL without MYSQL_DATABASE_URL. Please set it in your environment variables.",
			);
		}
		return new Pool({
			connectionString: process.env.MYSQL_DATABASE_URL,
		});
	}
	if (process.env.USE_MYSQL) {
		if (!process.env.MYSQL_DATABASE_URL) {
			throw new Error(
				"Using MySQL dialect without MYSQL_DATABASE_URL. Please set it in your environment variables.",
			);
		}
		return createPool(process.env.MYSQL_DATABASE_URL || "");
	}
	if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
		return new LibsqlDialect({
			url: process.env.TURSO_DATABASE_URL,
			authToken: process.env.TURSO_AUTH_TOKEN,
		});
	}
	// Default to SQLite for development if no other database is configured
	return null;
})();

if (!db) {
	throw new Error("No database connection found");
}

const baseURL: string | undefined =
	process.env.VERCEL === "1"
		? process.env.VERCEL_ENV === "production"
			? process.env.BETTER_AUTH_URL
			: process.env.VERCEL_ENV === "preview"
				? `https://${process.env.VERCEL_URL}`
				: undefined
		: undefined;

const cookieDomain: string | undefined =
	process.env.VERCEL === "1"
		? process.env.VERCEL_ENV === "production"
			? ".better-auth.com"
			: process.env.VERCEL_ENV === "preview"
				? `.${process.env.VERCEL_URL}`
				: undefined
		: undefined;

export const auth = betterAuth({
	appName: "Better Auth Demo",
	baseURL,
	database: db,
	emailVerification: {
		async sendVerificationEmail({ user, url }) {
			const res = await resend.emails.send({
				from,
				to: to || user.email,
				subject: "Verify your email address",
				html: `<a href="${url}">Verify your email address</a>`,
			});
			console.log(res, user.email);
		},
	},
	account: {
		accountLinking: {
			trustedProviders: ["google", "github", "demo-app"],
		},
	},
	emailAndPassword: {
		enabled: true,
		async sendResetPassword({ user, url }) {
			await resend.emails.send({
				from,
				to: user.email,
				subject: "Reset your password",
				react: reactResetPasswordEmail({
					username: user.email,
					resetLink: url,
				}),
			});
		},
	},
	socialProviders: {
		...(process.env.FACEBOOK_CLIENT_ID &&
			process.env.FACEBOOK_CLIENT_SECRET && {
				facebook: {
					clientId: process.env.FACEBOOK_CLIENT_ID,
					clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
				},
			}),
		...(process.env.GITHUB_CLIENT_ID &&
			process.env.GITHUB_CLIENT_SECRET && {
				github: {
					clientId: process.env.GITHUB_CLIENT_ID,
					clientSecret: process.env.GITHUB_CLIENT_SECRET,
				},
			}),
		...(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
			process.env.GOOGLE_CLIENT_SECRET && {
				google: {
					clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				},
			}),
		...(process.env.DISCORD_CLIENT_ID &&
			process.env.DISCORD_CLIENT_SECRET && {
				discord: {
					clientId: process.env.DISCORD_CLIENT_ID,
					clientSecret: process.env.DISCORD_CLIENT_SECRET,
				},
			}),
		...(process.env.MICROSOFT_CLIENT_ID &&
			process.env.MICROSOFT_CLIENT_SECRET && {
				microsoft: {
					clientId: process.env.MICROSOFT_CLIENT_ID,
					clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
				},
			}),
		...(process.env.TWITCH_CLIENT_ID &&
			process.env.TWITCH_CLIENT_SECRET && {
				twitch: {
					clientId: process.env.TWITCH_CLIENT_ID,
					clientSecret: process.env.TWITCH_CLIENT_SECRET,
				},
			}),
		...(process.env.TWITTER_CLIENT_ID &&
			process.env.TWITTER_CLIENT_SECRET && {
				twitter: {
					clientId: process.env.TWITTER_CLIENT_ID,
					clientSecret: process.env.TWITTER_CLIENT_SECRET,
				},
			}),
		...(process.env.PAYPAL_CLIENT_ID &&
			process.env.PAYPAL_CLIENT_SECRET && {
				paypal: {
					clientId: process.env.PAYPAL_CLIENT_ID,
					clientSecret: process.env.PAYPAL_CLIENT_SECRET,
				},
			}),
	},
	plugins: [
		organization({
			async sendInvitationEmail(data) {
				await resend.emails.send({
					from,
					to: data.email,
					subject: "You've been invited to join an organization",
					react: reactInvitationEmail({
						username: data.email,
						invitedByUsername: data.inviter.user.name,
						invitedByEmail: data.inviter.user.email,
						teamName: data.organization.name,
						inviteLink:
							process.env.NODE_ENV === "development"
								? `http://localhost:3000/accept-invitation/${data.id}`
								: `${
										process.env.BETTER_AUTH_URL ||
										"https://demo.better-auth.com"
									}/accept-invitation/${data.id}`,
					}),
				});
			},
		}),
		twoFactor({
			otpOptions: {
				async sendOTP({ user, otp }) {
					await resend.emails.send({
						from,
						to: user.email,
						subject: "Your OTP",
						html: `Your OTP is ${otp}`,
					});
				},
			},
		}),
		passkey(),
		openAPI(),
		bearer(),
		admin({
			adminUserIds: ["EXD5zjob2SD6CBWcEQ6OpLRHcyoUbnaB"],
		}),
		multiSession(),
		oAuthProxy(),
		nextCookies(),
		oneTap(),
		apiKey({
			enableMetadata: true,
		}),
		customSession(async (session) => {
			return {
				...session,
				user: {
					...session.user,
					dd: "test",
				},
			};
		}),
		deviceAuthorization({
			expiresIn: "3min",
			interval: "5s",
		}),
		lastLoginMethod(),
	],
	trustedOrigins: ["exp://"],
	advanced: {
		crossSubDomainCookies: {
			enabled: process.env.NODE_ENV === "production",
			domain: cookieDomain,
		},
	},
});
