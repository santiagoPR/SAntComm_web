-- CreateTable
CREATE TABLE "integration_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "emailProvider" TEXT,
    "sendgridApiKey" TEXT,
    "sendgridFromEmail" TEXT,
    "sendgridFromName" TEXT,
    "smtpHost" TEXT,
    "smtpPort" INTEGER,
    "smtpUser" TEXT,
    "smtpPass" TEXT,
    "facebookPageId" TEXT,
    "facebookAccessToken" TEXT,
    "linkedinAccessToken" TEXT,
    "linkedinOrgId" TEXT,
    "twitterApiKey" TEXT,
    "twitterApiSecret" TEXT,
    "twitterAccessToken" TEXT,
    "twitterAccessSecret" TEXT,
    "webhookBaseUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "integration_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "integration_settings_userId_key" ON "integration_settings"("userId");
