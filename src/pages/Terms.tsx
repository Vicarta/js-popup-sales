import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto">
          <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
            JS Popup Sales
          </Link>
        </div>
      </header>
      
      <main className="flex-1 py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">Terms of Use</h1>
          <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12">Last Updated: December 2024</p>
          
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
            By accessing this demo website or downloading the software ("JS Popup Sales"), you agree to be bound by these Terms of Use.
          </p>

          <div className="space-y-6 sm:space-y-8">
            <section className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">1. License & Restrictions</h3>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                The software is provided under a <strong className="text-foreground">Modified MIT License</strong>.
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground space-y-2 ml-2">
                <li><strong className="text-foreground">Allowed:</strong> You are free to use, copy, modify, merge, publish, and distribute copies of the software for both personal and commercial projects (e.g., integrating into websites or web applications).</li>
                <li><strong className="text-foreground">Restricted:</strong> You <strong className="text-foreground">may not</strong> sell, rent, or sub-license the software itself (source code) as a standalone product or as the primary value of a package.</li>
              </ul>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">2. Usage</h3>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                You may use this software for any purpose, including commercial applications, provided you comply with the resale restrictions outlined in the License. No attribution is required on the frontend of your projects, though it is appreciated in the source code or documentation.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">3. Disclaimer of Warranty</h3>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                THE SOFTWARE AND THIS DEMO SERVICE ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">4. Limitation of Liability</h3>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">5. Support</h3>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                Support is provided on a "best-effort" basis exclusively through <a href="https://github.com/Vicarta/js-popup-sale/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Issues</a>. There is no guarantee of response time, resolution, or ongoing maintenance.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
