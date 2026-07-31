import { useParams, Link } from "react-router-dom";
import { getCertificate, GRADUATION_LEVEL_ID } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { LoadingScreen } from "../lib/auth";
import { Button } from "../components/ui/button";
import { Download, ArrowLeft, Award, GraduationCap } from "lucide-react";
import { formatDate } from "../lib/utils";

export default function Certificate() {
  const { id } = useParams();
  const { data: certificate, loading } = useAsync(
    () => getCertificate(id ?? ""),
    [id]
  );

  if (loading) return <LoadingScreen />;

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cs-900 p-4">
        <CardNotFound />
      </div>
    );
  }

  const isGraduation = certificate.level_id === GRADUATION_LEVEL_ID;
  const accent = isGraduation ? "#f59e0b" : "#6366f1";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-cs-900 p-4 print:p-0 flex flex-col items-center">
      <div className="max-w-[800px] w-full flex items-center justify-between mb-6 print:hidden">
        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 text-sm text-cs-400 hover:text-cs-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        <Button variant="primary" size="md" onClick={handlePrint}>
          <Download className="w-4 h-4" />
          Download / Print
        </Button>
      </div>

      <div
        id="certificate"
        className="max-w-[800px] w-full bg-gradient-to-br from-cs-800 via-cs-800 to-cs-900 rounded-2xl border-2 p-12 print:border-2 print:rounded-none print:p-8 print:shadow-none"
        style={{
          borderColor: `${accent}66`,
          boxShadow: `0 0 40px ${accent}1a`,
        }}
      >
        <div
          className="h-1 rounded-full mb-8"
          style={{
            background: isGraduation
              ? "linear-gradient(to right, #f59e0b, #fbbf24, #f59e0b)"
              : "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
          }}
        />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: isGraduation ? "rgba(245,158,11,0.12)" : "rgba(99,102,241,0.1)",
              }}
            >
              {isGraduation ? (
                <GraduationCap className="w-8 h-8" style={{ color: accent }} />
              ) : (
                <Award className="w-8 h-8 text-accent" />
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-cs-100 mb-1">
            {isGraduation ? "Graduation Certificate" : "Certificate of Completion"}
          </h1>
          <p className="text-cs-500 text-sm">CodeSchool</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-cs-400 mb-6">This certifies that</p>
          <h2 className="text-2xl font-bold text-cs-100 mb-2">{certificate.user_name}</h2>
          <div
            className="w-16 h-0.5 mx-auto mb-4"
            style={{ backgroundColor: accent }}
          />
          <p className="text-cs-400 mb-2">
            {isGraduation
              ? "has completed the full CodeSchool software engineering program and graduated as a"
              : "has successfully completed the"}
          </p>
          <h3
            className="text-xl font-bold mb-4"
            style={{ color: accent }}
          >
            {isGraduation ? certificate.level_title : `${certificate.level_title} Level`}
          </h3>
          <p className="text-cs-500 text-sm">Awarded on {formatDate(certificate.issued_at)}</p>
        </div>

        <div className="text-center pt-6 border-t border-cs-700">
          <p className="text-xs text-cs-500">
            Verification Code:{" "}
            <span className="font-mono" style={{ color: accent }}>
              {certificate.unique_code}
            </span>
          </p>
          <p className="text-[10px] text-cs-600 mt-1">
            Verify at codeschool.app/certificate/{certificate.unique_code}
          </p>
        </div>

        <div
          className="h-1 rounded-full mt-8"
          style={{
            background: isGraduation
              ? "linear-gradient(to right, #f59e0b, #fbbf24, #f59e0b)"
              : "linear-gradient(to right, #ec4899, #a855f7, #6366f1)",
          }}
        />
      </div>

      <style>{`
        @media print {
          @page { margin: 0.5in; size: landscape; }
          body { background: white !important; }
          #root { background: white !important; }
          #certificate { background: white !important; border-color: #6366f1 !important; box-shadow: none !important; }
          #certificate h3 { color: #1a1a2e !important; }
          #certificate h1, #certificate h2, #certificate h3, #certificate p, #certificate span { color: #1a1a2e !important; }
          .print\\\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function CardNotFound() {
  return (
    <div className="max-w-md w-full p-10 rounded-2xl border border-cs-700 bg-cs-800 text-center">
      <Award className="w-12 h-12 text-cs-600 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-cs-100 mb-2">Certificate not found</h2>
      <p className="text-sm text-cs-400 mb-6">
        We couldn't find a certificate with that code. Double-check the link.
      </p>
      <Link to="/" className="inline-block">
        <Button variant="primary" size="sm">Back to Home</Button>
      </Link>
    </div>
  );
}
