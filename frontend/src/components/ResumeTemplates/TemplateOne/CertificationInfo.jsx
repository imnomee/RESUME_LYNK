const CertificationInfo = ({ title, issuer, year, bgColor }) => {
    return (
        <div className="">
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="flex items-center justify-between">
                {year && (
                    <div
                        className="text-[12px] font-bold text-gray-800 px-3 py-1 inline-block mt-2 rounded-lg"
                        style={{ backgroundColor: bgColor }}>
                        {year}
                    </div>
                )}
                <p className="text-[12px] text-gray-700 font-medium mt-1">
                    {issuer}
                </p>
            </div>
        </div>
    );
};

export default CertificationInfo;
