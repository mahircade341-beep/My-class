import { useParams, Link } from "react-router-dom";
import { getCertificate } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { LoadingScreen } from "../lib/auth";
import { Button } from "../components/ui/button";
import { Download, ArrowLeft, Award } from "lucide-react";
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
        className="max-w-[800px] w-full bg-gradient-to-br from-cs-800 via-cs-800 to-cs-900 rounded-2xl border-2 border-accent/30 p-12 print:border-2 print:border-accent print:rounded-none print:p-8 print:shadow-none"
        style={{
          boxShadow: "0 0 40px rgba(99, 102, 241, 0.1)",
        }}
      >
        <div className="h-1 bg-gradient-to-r from-accent via-purple-500 to-pink-500 rounded-full mb-8" />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Award className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-cs-100 mb-1">Certificate of Completion</h1>
          <p className="text-cs-500 text-sm">CodeSchool</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-cs-400 mb-6">This certifies that</p>
          <h2 className="text-2xl font-bold text-cs-100 mb-2">{certificate.user_name}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-cs-400 mb-2">has successfully completed the</p>
          <h3 className="text-xl font-bold text-accent mb-4">{certificate.level_title} Level</h3>
          <p className="text-cs-500 text-sm">Awarded on {formatDate(certificate.issued_at)}</p>
        </div>

        <div className="text-center pt-6 border-t border-cs-700">
          <p className="text-xs text-cs-500">
            Verification Code:{" "}
            <span className="font-mono text-accent">{certificate.unique_code}</span>
          </p>
          <p className="text-[10px] text-cs-600 mt-1">
            Verify at codeschool.app/certificate/{certificate.unique_code}
          </p>
        </div>

        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-accent rounded-full mt-8" />
      </div>

      <style>{`
        @media print {
          @page { margin: 0.5in; size: landscape; }
          body { background: white !important; }
          #root { background: white !important; }
          #certificate { background: white !important; border-color: #6366f1 !important; box-shadow: none !important; }
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
