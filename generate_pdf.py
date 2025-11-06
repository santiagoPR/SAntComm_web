"""
Generate PDF from the academic analysis with proper formatting
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

def create_pdf():
    # Create PDF
    pdf_file = "Assignment1_Analysis.pdf"
    doc = SimpleDocTemplate(pdf_file, pagesize=letter,
                           topMargin=1*inch, bottomMargin=1*inch,
                           leftMargin=1*inch, rightMargin=1*inch)

    # Container for elements
    elements = []

    # Get styles
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=14,
        alignment=TA_CENTER,
        spaceAfter=12,
        fontName='Helvetica-Bold'
    )

    centered_style = ParagraphStyle(
        'Centered',
        parent=styles['Normal'],
        fontSize=12,
        alignment=TA_CENTER,
        spaceAfter=6
    )

    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=12,
        fontName='Helvetica-Bold',
        spaceAfter=12,
        spaceBefore=12
    )

    subheading_style = ParagraphStyle(
        'CustomSubheading',
        parent=styles['Heading3'],
        fontSize=12,
        fontName='Helvetica-Bold',
        spaceAfter=6,
        spaceBefore=6
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=12,
        alignment=TA_JUSTIFY,
        spaceAfter=12,
        leading=24  # Double spacing (2x font size)
    )

    # Title page
    elements.append(Spacer(1, 2*inch))
    elements.append(Paragraph("ASSIGNMENT 1: ANALYZING PUBLIC DISCOURSE", title_style))
    elements.append(Spacer(1, 0.5*inch))
    elements.append(Paragraph("[Your Name]", centered_style))
    elements.append(Paragraph("[Course Name/Number]", centered_style))
    elements.append(Paragraph("February 11, 2025", centered_style))
    elements.append(Spacer(1, 0.3*inch))
    elements.append(Paragraph('<i>Article:</i> "Next Year Will Be the Best America\'s Had in a Long Time" by Paul du Quenoy', centered_style))
    elements.append(Paragraph("<i>Publication:</i> Newsweek Opinion, December 26, 2024", centered_style))

    elements.append(PageBreak())

    # Introduction
    elements.append(Paragraph("<b>Introduction</b>", heading_style))
    elements.append(Paragraph(
        "In the aftermath of the 2024 presidential election, American political discourse became dominated by competing visions for the nation's future under the incoming Trump administration. On December 26, 2024, Newsweek published an opinion piece by Paul du Quenoy titled \"Next Year Will Be the Best America's Had in a Long Time,\" which presents an optimistic forecast for 2025. Du Quenoy, serving as President of the Palm Beach Freedom Institute, argues that the return of Donald Trump to the presidency will usher in economic prosperity, international peace, and the reversal of policies he characterizes as harmful to American interests. While du Quenoy employs a combination of credibility-building, emotional appeals, and logical arguments to persuade his audience, the effectiveness of his rhetoric is significantly limited by partisan framing, unsubstantiated predictions, and reliance on ideologically charged language that appeals primarily to readers already sympathetic to conservative positions.",
        body_style
    ))

    # The Article's Thesis and Main Claims
    elements.append(Paragraph("<b>The Article's Thesis and Main Claims</b>", heading_style))
    elements.append(Paragraph(
        "Du Quenoy's central thesis asserts that 2025 will represent a remarkable year of improvement for America, driven by the policy agenda of the incoming Trump administration and favorable political conditions including Republican control of Congress and a conservative Supreme Court majority. The author structures his argument around three primary domains: economic policy, foreign affairs, and domestic cultural changes.",
        body_style
    ))
    elements.append(Paragraph(
        "In the economic sphere, du Quenoy claims that Trump will implement significant tax cuts, reduce federal spending by up to one-third, combat inflation that he attributes to the Biden administration, and restore energy independence through expanded domestic production. These economic promises form the foundation of his optimistic vision, suggesting that Americans will experience tangible financial benefits under the new administration.",
        body_style
    ))
    elements.append(Paragraph(
        "Regarding foreign policy, the author predicts that Trump's return will prompt peace negotiations to end the conflict in Ukraine and stabilize the Middle East. He cites \"impressive pledges of foreign investment\" and improved cooperation on border security with Mexico as evidence of international confidence in Trump's leadership. This framing positions Trump as a uniquely effective diplomatic figure capable of resolving complex international conflicts.",
        body_style
    ))
    elements.append(Paragraph(
        "On domestic policy, du Quenoy argues for the termination of what he labels \"destructive anti-American ideologies,\" specifically targeting critical race theory and diversity, equity, and inclusion (DEI) initiatives. This cultural argument extends beyond economic and foreign policy concerns to encompass broader conservative grievances about progressive social movements.",
        body_style
    ))

    # Persuasive Tactics
    elements.append(Paragraph("<b>Persuasive Tactics: Ethos, Pathos, and Logos</b>", heading_style))

    elements.append(Paragraph("<b><i>Ethos: Establishing Credibility</i></b>", subheading_style))
    elements.append(Paragraph(
        "Du Quenoy attempts to establish credibility through his institutional affiliation as President of the Palm Beach Freedom Institute. This title suggests expertise in policy analysis and positions him as a thought leader within conservative intellectual circles. However, the Palm Beach Freedom Institute's close geographical and ideological proximity to Trump's Mar-a-Lago residence may undermine his claim to objective analysis, instead signaling partisan advocacy. The author does not cite his academic credentials, policy expertise, or professional background beyond this institutional title, which limits the depth of credibility he can claim. For readers unfamiliar with this organization, the ethos appeal remains relatively weak, relying primarily on the platform provided by Newsweek rather than demonstrated subject matter expertise.",
        body_style
    ))

    elements.append(Paragraph("<b><i>Pathos: Emotional Appeals</i></b>", subheading_style))
    elements.append(Paragraph(
        "The article's emotional resonance derives significantly from its strategic language choices and framing. The title itself—"Next Year Will Be the Best America's Had in a Long Time"—evokes optimism and suggests a relief from current hardships. This positive framing appeals to readers experiencing economic anxiety or political frustration, offering hope for improvement. Du Quenoy employs emotionally charged language throughout, describing opposing policies as "destructive anti-American ideologies," which triggers patriotic sentiment and positions policy disagreements as threats to national identity rather than legitimate political differences.",
        body_style
    ))
    elements.append(Paragraph(
        "The characterization of the Biden-Harris administration as having "abandoned" energy independence appeals to feelings of economic vulnerability and national weakness. By framing the incoming administration's policies as restorative rather than merely different, du Quenoy taps into nostalgia for a perceived better past. This emotional strategy proves effective for audiences already dissatisfied with the outgoing administration but offers little persuasive power for skeptical readers who may view the same language as inflammatory rhetoric rather than substantive analysis.",
        body_style
    ))

    elements.append(Paragraph("<b><i>Logos: Logical Reasoning and Evidence</i></b>", subheading_style))
    elements.append(Paragraph(
        "The logical structure of du Quenoy's argument relies heavily on predicted outcomes rather than demonstrated causal relationships or empirical evidence. He argues that Republican control of both congressional chambers and the presidency, combined with a conservative Supreme Court majority, creates favorable conditions for policy implementation. This political reality does provide a logical foundation for expecting significant legislative activity, though it does not guarantee the specific outcomes he predicts.",
        body_style
    ))
    elements.append(Paragraph(
        "The author's economic arguments about tax cuts stimulating growth and spending reductions improving fiscal health represent standard conservative economic theory. However, he provides no specific evidence, historical precedent, or economic modeling to support the claim that these policies will produce the dramatic improvements he forecasts. The assertion that federal spending can be reduced by "up to one-third" lacks any supporting detail about which programs would face cuts or how such a massive reduction could be implemented without severe social consequences.",
        body_style
    ))
    elements.append(Paragraph(
        "Similarly, the foreign policy predictions about peace in Ukraine and the Middle East rely on assertion rather than analysis of the complex geopolitical factors driving these conflicts. The claim that Trump's election has already generated "impressive pledges of foreign investment" and improved Mexican cooperation on border security lacks specific citations or verifiable sources, weakening the logical foundation of these arguments. The absence of concrete evidence or rigorous reasoning significantly limits the persuasive power of the logos appeal, particularly for readers seeking substantive policy analysis rather than partisan cheerleading.",
        body_style
    ))

    # Target Audience and Effectiveness
    elements.append(Paragraph("<b>Target Audience and Effectiveness</b>", heading_style))
    elements.append(Paragraph(
        "Du Quenoy's primary target audience consists of conservative readers, Trump supporters, and individuals already predisposed to view the incoming administration favorably. The article's language, framing, and assumptions all point toward this core demographic. References to "anti-American ideologies" and criticism of DEI initiatives resonate specifically with conservative cultural concerns, while the economic promises align with traditional Republican policy preferences.",
        body_style
    ))
    elements.append(Paragraph(
        "For this intended audience, the article likely proves quite effective as reinforcement of existing beliefs and a source of optimistic expectations. The emotional appeals to patriotism, economic improvement, and cultural restoration align perfectly with conservative priorities. The credibility established through publication in a mainstream outlet like Newsweek lends institutional legitimacy to views that readers may already hold, providing validation and talking points for political discussions.",
        body_style
    ))
    elements.append(Paragraph(
        "However, the article's effectiveness drops precipitously outside this core audience. Moderate readers seeking balanced analysis would likely find the partisan framing off-putting and the lack of supporting evidence unconvincing. Progressive readers would reject both the characterization of DEI initiatives as "anti-American" and the optimistic predictions about Trump's policies, potentially viewing the piece as propaganda rather than serious commentary. The article makes no apparent effort to address counterarguments or acknowledge potential downsides to the proposed policies, which limits its persuasive reach beyond the already-convinced.",
        body_style
    ))
    elements.append(Paragraph(
        "Notably, the Baptist News Global published a fact-checking response identifying at least 22 false claims within du Quenoy's article, describing it as reading "as though it came straight from a Trump rally with no fact checkers present." This critical reception from religious media, typically sympathetic to conservative viewpoints, suggests that the article's factual foundation may be insufficiently rigorous even for audiences predisposed to agree with its conclusions.",
        body_style
    ))

    # Author's Goal and Achievement
    elements.append(Paragraph("<b>Author's Goal and Achievement</b>", heading_style))
    elements.append(Paragraph(
        "Du Quenoy's stated goal appears straightforward: to predict and outline the positive developments he expects in 2025 under the Trump administration. However, the article's rhetorical strategies suggest a deeper implicit goal of building enthusiasm and support for the incoming administration's policy agenda. By framing 2025 as potentially "the best America's had in a long time," du Quenoy sets extraordinarily high expectations while positioning criticism of Trump's policies as opposition to American improvement itself.",
        body_style
    ))
    elements.append(Paragraph(
        "In terms of achieving the stated predictive goal, the article's success can only be evaluated over time as the year 2025 unfolds and the actual policy outcomes become clear. The sweeping nature of the predictions—dramatic spending cuts, resolution of international conflicts, economic prosperity—makes falsification relatively straightforward, as failure to achieve any of these major outcomes would undermine the article's credibility.",
        body_style
    ))
    elements.append(Paragraph(
        "Regarding the implicit goal of building support, du Quenoy achieves moderate success within his target audience while likely alienating or failing to persuade broader readership. The article successfully articulates an optimistic vision that conservative readers can embrace and share, potentially influencing political discourse within right-leaning communities. However, the lack of evidentiary support, the inflammatory characterization of opposing viewpoints, and the exclusively positive framing without acknowledgment of potential challenges or tradeoffs significantly limit the article's persuasive impact beyond the already-sympathetic.",
        body_style
    ))
    elements.append(Paragraph(
        "The author's choice to publish this piece immediately following Christmas, during a period when Americans traditionally look forward to the new year with hope and reflection, shows strategic timing. This positioning allows the optimistic message to align with seasonal sentiment, potentially increasing receptivity among casual readers in a forward-looking mindset.",
        body_style
    ))

    # Conclusion
    elements.append(Paragraph("<b>Conclusion</b>", heading_style))
    elements.append(Paragraph(
        "Paul du Quenoy's opinion piece "Next Year Will Be the Best America's Had in a Long Time" represents a clearly partisan exercise in political persuasion rather than balanced policy analysis. Through strategic deployment of emotional language, institutional credibility, and optimistic predictions, the author constructs a vision of American improvement under the Trump administration that resonates powerfully with conservative readers while offering little to persuade skeptics or moderate observers.",
        body_style
    ))
    elements.append(Paragraph(
        "The article's rhetorical effectiveness remains constrained by significant limitations: the reliance on unsupported predictions rather than evidence-based arguments, the inflammatory characterization of opposing viewpoints, and the complete absence of acknowledgment regarding potential challenges or policy tradeoffs. While du Quenoy succeeds in articulating conservative hopes and expectations for 2025, he fails to build a persuasive case that would convince readers not already predisposed to agree with his conclusions.",
        body_style
    ))
    elements.append(Paragraph(
        "This analysis reveals broader patterns in contemporary political discourse, where opinion pieces increasingly function as reinforcement mechanisms for partisan audiences rather than vehicles for genuine persuasion across ideological lines. Du Quenoy's article exemplifies this trend, demonstrating both the power of targeted rhetorical appeals to sympathetic audiences and the limitations of such approaches in fostering meaningful democratic dialogue. As America moves forward into 2025, the gap between the optimistic predictions in pieces like this and the complex realities of governance will serve as a critical test not only of the incoming administration's effectiveness but also of the credibility of partisan commentary that prioritizes cheerleading over rigorous analysis.",
        body_style
    ))

    # Works Cited
    elements.append(PageBreak())
    elements.append(Paragraph("<b>Works Cited</b>", heading_style))

    citation_style = ParagraphStyle(
        'Citation',
        parent=styles['Normal'],
        fontSize=12,
        alignment=TA_LEFT,
        spaceAfter=12,
        leftIndent=0.5*inch,
        firstLineIndent=-0.5*inch,
        leading=24
    )

    elements.append(Paragraph(
        'Du Quenoy, Paul. "Next Year Will Be the Best America\'s Had in a Long Time." <i>Newsweek</i>, 26 Dec. 2024, www.newsweek.com/next-year-will-best-americas-had-long-time-opinion-2005161.',
        citation_style
    ))
    elements.append(Paragraph(
        '"Why Did Newsweek Publish an Op-Ed with at Least 22 False Claims?" <i>Baptist News Global</i>, baptistnews.com/article/why-did-newsweek-publish-an-op-ed-with-at-least-22-false-claims/.',
        citation_style
    ))

    # Build PDF
    doc.build(elements)
    print(f"PDF created successfully: {pdf_file}")
    return pdf_file

if __name__ == "__main__":
    create_pdf()
