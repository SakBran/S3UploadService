using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SystemSetting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SystemSetting",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MpuUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AyaEnquiryURl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecretKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppSecret = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CurrencyCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IMAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MOCAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OnlineFees = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RegistrationYear = table.Column<int>(type: "int", nullable: false),
                    smsApiUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    smsUsername = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    smsPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    S3accessKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    S3secretKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BucketName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    S3Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExtensionPeriodInDays = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemSetting", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SystemSetting");
        }
    }
}
